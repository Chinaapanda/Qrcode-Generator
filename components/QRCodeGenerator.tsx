"use client";

import { DownloadFormat, QRGeneratorProps } from "@/lib/types";
import { useState } from "react";
import PhotoshopSidebar from "./PhotoshopSidebar";
import QRPreview from "./QRPreview";
import { ThemeProvider } from "./ThemeProvider";

const QRCodeGenerator = ({
  config,
  updateConfig,
  resetConfig,
}: QRGeneratorProps) => {
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [pixelMatchImageUrl, setPixelMatchImageUrl] = useState<string | null>(
    null
  );

  const downloadQR = (format: DownloadFormat) => {
    // Handled by QRPreview component
  };

  return (
    <ThemeProvider>
      <div className="pr-80">
        {" "}
        {/* Add right padding for fixed sidebar */}
        <div className="max-w-5xl mx-auto">
          <QRPreview
            config={config}
            logoDataUrl={logoDataUrl}
            pixelMatchImageUrl={pixelMatchImageUrl}
            onDownload={downloadQR}
            onReset={resetConfig}
            onUpdateConfig={updateConfig}
          />
        </div>
        <PhotoshopSidebar
          config={config}
          updateConfig={updateConfig}
          resetConfig={resetConfig}
          logoDataUrl={logoDataUrl}
          setLogoDataUrl={setLogoDataUrl}
          pixelMatchImageUrl={pixelMatchImageUrl}
          setPixelMatchImageUrl={setPixelMatchImageUrl}
        />
      </div>
    </ThemeProvider>
  );
};

export default QRCodeGenerator;
