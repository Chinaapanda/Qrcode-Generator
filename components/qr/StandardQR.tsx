import { QRConfig } from "@/lib/types";
import { QrcodeCanvas } from "react-qrcode-pretty";

interface StandardQRProps {
  config: QRConfig;
  logoDataUrl: string | null;
  onReady: (canvas: HTMLCanvasElement) => void;
}

const StandardQR = ({ config, logoDataUrl, onReady }: StandardQRProps) => {
  // Prepare color configuration
  const qrColor =
    config.cornerEyeColor !== config.dotColor
      ? { eyes: config.cornerEyeColor, body: config.dotColor }
      : config.dotColor;

  const qrVariant =
    config.eyeVariant !== config.qrVariant
      ? { body: config.qrVariant, eyes: config.eyeVariant }
      : config.qrVariant;

  return (
    <QrcodeCanvas
      value={config.data}
      size={config.size}
      margin={config.margin}
      color={qrColor}
      variant={qrVariant}
      colorEffect={config.colorEffect}
      divider={config.divider}
      bgColor={
        config.backgroundTransparent ? "transparent" : config.backgroundColor
      }
      bgRounded={config.bgRounded}
      image={
        logoDataUrl
          ? {
              src: logoDataUrl,
              width: config.size * config.logoSize,
              height: config.size * config.logoSize,
              overlap: true,
            }
          : undefined
      }
      onReady={onReady}
    />
  );
};

export default StandardQR;
