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
