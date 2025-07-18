"use client";

import { DownloadFormat, QRGeneratorProps } from "@/lib/types";
import { Menu, X } from "lucide-react";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const downloadQR = (format: DownloadFormat) => {
    // Handled by QRPreview component
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <div className="relative">
        {/* Mobile sidebar toggle button */}
        <div className="lg:hidden fixed top-4 right-4 z-50">
          <button
            onClick={toggleSidebar}
            className="p-3 bg-primary text-primary-foreground rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile backdrop overlay */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={closeSidebar}
            aria-hidden="true"
          />
        )}

        {/* Main content area with responsive padding */}
        <div className="lg:pr-80 transition-all duration-300">
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
        </div>

        {/* Responsive sidebar */}
        <PhotoshopSidebar
          config={config}
          updateConfig={updateConfig}
          resetConfig={resetConfig}
          logoDataUrl={logoDataUrl}
          setLogoDataUrl={setLogoDataUrl}
          pixelMatchImageUrl={pixelMatchImageUrl}
          setPixelMatchImageUrl={setPixelMatchImageUrl}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      </div>
    </ThemeProvider>
  );
};

export default QRCodeGenerator;
