export interface QRConfig {
  data: string;
  size: number;
  margin: number;
  dotColor: string;
  backgroundColor: string;
  backgroundTransparent: boolean;
  cornerEyeColor: string;
  cornerEyeInnerColor: string;
  cornerEyeStyle: "square" | "dot" | "extra-rounded";
  dotShape: "square" | "dots" | "rounded" | "extra-rounded";
  logo: File | null;
  logoSize: number;
  logoMargin: number;
  logoCornerRadius: number;
  logoBackgroundColor: string;
  logoBackgroundTransparent: boolean;
  // QR Styling with react-qrcode-pretty
  qrVariant:
    | "standard"
    | "rounded"
    | "dots"
    | "circle"
    | "fluid"
    | "reverse"
    | "shower"
    | "gravity"
    | "morse"
    | "italic"
    | "inclined";
  eyeVariant:
    | "standard"
    | "rounded"
    | "dots"
    | "circle"
    | "fluid"
    | "reverse"
    | "shower"
    | "gravity"
    | "morse"
    | "italic"
    | "inclined";
  colorEffect:
    | "none"
    | "gradient-dark-vertical"
    | "gradient-dark-horizontal"
    | "gradient-dark-diagonal"
    | "gradient-light-vertical"
    | "gradient-light-horizontal"
    | "gradient-light-diagonal"
    | "colored"
    | "shades";
  divider: boolean;
  bgRounded: boolean;
  // Frame feature
  frameStyle: "none" | "scan-me" | "speech-bubble" | "rounded-box" | "border";
  frameText: string;
  // Pixel matching feature
  pixelMatchEnabled: boolean;
  pixelMatchImage: File | null;
  pixelMatchOpacity: number;
  pixelMatchBlending: "normal" | "multiply" | "overlay" | "screen";
  pixelMatchResolution: number; // Scale factor for image processing
}

export interface QRGeneratorProps {
  config: QRConfig;
  updateConfig: (updates: Partial<QRConfig>) => void;
  resetConfig: () => void;
}

export type DownloadFormat = "png" | "svg";

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label: string;
}
