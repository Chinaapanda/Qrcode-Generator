import { PixelData } from "@/lib/pixelMatcher";
import { QRConfig } from "@/lib/types";
import { useEffect, useRef } from "react";
// @ts-ignore
import QRCodeStyling from "qr-code-styling";

interface PixelMatchQRProps {
  config: QRConfig;
  pixelData: PixelData;
  logoDataUrl?: string | null;
  onReady?: (canvas: HTMLCanvasElement) => void;
}

const PixelMatchQR = ({
  config,
  pixelData,
  logoDataUrl,
  onReady,
}: PixelMatchQRProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!qrRef.current || !pixelData) return;

    // Create a standard QR code first
    const qrCode = new QRCodeStyling({
      width: config.size,
      height: config.size,
      type: "canvas",
      data: config.data,
      margin: config.margin,
      qrOptions: {
        typeNumber: 0,
        mode: "Byte",
        errorCorrectionLevel: "Q",
      },
      dotsOptions: {
        color: config.dotColor,
        type: config.dotShape as any,
      },
      backgroundOptions: {
        color: config.backgroundTransparent
          ? "transparent"
          : config.backgroundColor,
      },
      cornersSquareOptions: {
        color: config.cornerEyeColor,
        type: config.cornerEyeStyle as any,
      },
      cornersDotOptions: {
        color: config.cornerEyeInnerColor,
        type: config.cornerEyeStyle as any,
      },
    });

    // Clear previous content
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
    }

    // Generate QR code
    qrCode.append(qrRef.current);

    // Apply pixel matching after QR is generated
    setTimeout(() => {
      const qrCanvas = qrRef.current?.querySelector(
        "canvas"
      ) as HTMLCanvasElement;
      if (qrCanvas) {
        applyPixelMatching(qrCanvas, pixelData, config);
        if (onReady) {
          onReady(qrCanvas);
        }
      }
    }, 100);

    // Add logo if provided
    if (logoDataUrl) {
      qrCode.update({
        image: logoDataUrl,
      });
    }

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
      }
    };
  }, [config, pixelData, logoDataUrl]);

  return <div ref={qrRef} className="flex justify-center items-center" />;
};

// Function to apply pixel matching to existing QR canvas
function applyPixelMatching(
  canvas: HTMLCanvasElement,
  pixelData: PixelData,
  config: QRConfig
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Calculate module size (approximate)
  const moduleSize = Math.floor((canvas.width - config.margin * 2) / 25);
  const startOffset = config.margin;

  // Apply pixel colors to QR modules
  for (let moduleY = 0; moduleY < 25; moduleY++) {
    for (let moduleX = 0; moduleX < 25; moduleX++) {
      // Get corresponding pixel color
      const pixelX = Math.floor((moduleX / 25) * pixelData.width);
      const pixelY = Math.floor((moduleY / 25) * pixelData.height);

      if (pixelY < pixelData.height && pixelX < pixelData.width) {
        const pixelColor = pixelData.colors[pixelY][pixelX];
        const rgb = hexToRgb(pixelColor);

        if (rgb) {
          // Calculate the area of this module on the canvas
          const startX = startOffset + moduleX * moduleSize;
          const startY = startOffset + moduleY * moduleSize;

          // Check if this area has QR data (not background)
          for (let y = startY; y < startY + moduleSize; y++) {
            for (let x = startX; x < startX + moduleSize; x++) {
              if (x < canvas.width && y < canvas.height) {
                const index = (y * canvas.width + x) * 4;

                // Check if this pixel is part of the QR pattern (not background)
                const isQRPixel = data[index] < 128; // Assuming dark pixels are QR data

                if (isQRPixel) {
                  // Apply pixel color with opacity
                  const blendedColor = blendColors(
                    pixelColor,
                    config.dotColor,
                    config.pixelMatchOpacity
                  );
                  const blendedRgb = hexToRgb(blendedColor);

                  if (blendedRgb) {
                    data[index] = blendedRgb.r; // Red
                    data[index + 1] = blendedRgb.g; // Green
                    data[index + 2] = blendedRgb.b; // Blue
                    // Alpha stays the same
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Put the modified image data back to canvas
  ctx.putImageData(imageData, 0, 0);
}

// Helper function to blend colors
function blendColors(
  pixelColor: string,
  defaultColor: string,
  opacity: number
): string {
  const pixelRgb = hexToRgb(pixelColor);
  const defaultRgb = hexToRgb(defaultColor);

  if (!pixelRgb || !defaultRgb) {
    return defaultColor;
  }

  const blended = {
    r: Math.round(pixelRgb.r * opacity + defaultRgb.r * (1 - opacity)),
    g: Math.round(pixelRgb.g * opacity + defaultRgb.g * (1 - opacity)),
    b: Math.round(pixelRgb.b * opacity + defaultRgb.b * (1 - opacity)),
  };

  return `#${blended.r.toString(16).padStart(2, "0")}${blended.g
    .toString(16)
    .padStart(2, "0")}${blended.b.toString(16).padStart(2, "0")}`;
}

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

export default PixelMatchQR;
