export interface PixelData {
  colors: string[][]; // 2D array of hex colors
  width: number;
  height: number;
}

export interface QRMatrix {
  modules: boolean[][]; // QR code module matrix
  size: number;
}

/**
 * Processes an image file and extracts pixel colors
 */
export async function processImageForPixelMatching(
  imageFile: File,
  targetSize: number = 25
): Promise<PixelData> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Set canvas size to target QR code matrix size
      canvas.width = targetSize;
      canvas.height = targetSize;

      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      // Draw and scale the image to fit the QR matrix size
      ctx.drawImage(img, 0, 0, targetSize, targetSize);

      // Extract pixel data
      const imageData = ctx.getImageData(0, 0, targetSize, targetSize);
      const data = imageData.data;

      const colors: string[][] = [];

      // Convert RGBA data to hex colors
      for (let y = 0; y < targetSize; y++) {
        colors[y] = [];
        for (let x = 0; x < targetSize; x++) {
          const index = (y * targetSize + x) * 4;
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const a = data[index + 3];

          // Convert to hex color
          const hex = rgbaToHex(r, g, b, a);
          colors[y][x] = hex;
        }
      }

      resolve({
        colors,
        width: targetSize,
        height: targetSize,
      });
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // Load image from file
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(imageFile);
  });
}

/**
 * Converts RGBA values to hex color
 */
function rgbaToHex(r: number, g: number, b: number, a: number): string {
  // If alpha is less than 50%, treat as transparent/background color
  if (a < 128) {
    return "#ffffff";
  }

  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generates a QR code with pixel-matched colors
 */
export function generateQRCodeWithPixelMatching(
  qrData: string,
  pixelData: PixelData,
  config: {
    size: number;
    opacity: number;
    blending: string;
    backgroundColor: string;
    defaultDotColor: string;
  }
): any {
  // This will be used to create custom color mapping for QR modules
  // The actual QR generation will be handled in the component
  return {
    colorMapper: (moduleX: number, moduleY: number, moduleValue: boolean) => {
      if (!moduleValue) {
        // Empty module - use background
        return config.backgroundColor;
      }

      // Map QR module position to pixel position
      const pixelX = Math.floor((moduleX / 25) * pixelData.width);
      const pixelY = Math.floor((moduleY / 25) * pixelData.height);

      // Get color from pixel data
      if (pixelY < pixelData.height && pixelX < pixelData.width) {
        const pixelColor = pixelData.colors[pixelY][pixelX];

        // Apply opacity and blending
        return applyColorEffects(
          pixelColor,
          config.defaultDotColor,
          config.opacity,
          config.blending
        );
      }

      return config.defaultDotColor;
    },
  };
}

/**
 * Applies color effects like opacity and blending
 */
function applyColorEffects(
  pixelColor: string,
  defaultColor: string,
  opacity: number,
  blending: string
): string {
  // Simple implementation - for now just blend with opacity
  if (opacity === 1) {
    return pixelColor;
  }

  // Convert hex to RGB for blending
  const pixelRgb = hexToRgb(pixelColor);
  const defaultRgb = hexToRgb(defaultColor);

  if (!pixelRgb || !defaultRgb) {
    return defaultColor;
  }

  // Blend colors based on opacity
  const blended = {
    r: Math.round(pixelRgb.r * opacity + defaultRgb.r * (1 - opacity)),
    g: Math.round(pixelRgb.g * opacity + defaultRgb.g * (1 - opacity)),
    b: Math.round(pixelRgb.b * opacity + defaultRgb.b * (1 - opacity)),
  };

  return `#${blended.r.toString(16).padStart(2, "0")}${blended.g
    .toString(16)
    .padStart(2, "0")}${blended.b.toString(16).padStart(2, "0")}`;
}

/**
 * Converts hex color to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Gets appropriate QR matrix size based on data length
 */
export function getQRMatrixSize(data: string): number {
  // Simple approximation - actual QR size depends on error correction level and version
  const dataLength = data.length;

  if (dataLength <= 25) return 21; // Version 1
  if (dataLength <= 47) return 25; // Version 2
  if (dataLength <= 77) return 29; // Version 3
  if (dataLength <= 114) return 33; // Version 4
  if (dataLength <= 154) return 37; // Version 5

  return 41; // Version 6+
}
