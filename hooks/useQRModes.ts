import { QRConfig } from "@/lib/types";

interface UseQRModesOptions {
  config: QRConfig;
  updateConfig: (updates: Partial<QRConfig>) => void;
}

export const useQRModes = ({ config, updateConfig }: UseQRModesOptions) => {
  // Determine current mode
  const isPixelMatchMode = config.pixelMatchEnabled && config.pixelMatchImage;
  const hasAdvancedStyling =
    config.qrVariant !== "standard" ||
    config.eyeVariant !== "standard" ||
    config.colorEffect !== "none" ||
    config.divider ||
    config.bgRounded;

  const disablePixelMatching = () => {
    updateConfig({
      pixelMatchImage: null,
      pixelMatchEnabled: false,
    });
  };

  const disableAdvancedStyling = () => {
    updateConfig({
      qrVariant: "standard",
      eyeVariant: "standard",
      colorEffect: "none",
      divider: false,
      bgRounded: false,
    });
  };

  return {
    isPixelMatchMode,
    hasAdvancedStyling,
    disablePixelMatching,
    disableAdvancedStyling,
  };
};
