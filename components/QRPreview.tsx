import {
  PixelData,
  getQRMatrixSize,
  processImageForPixelMatching,
} from "@/lib/pixelMatcher";
import { DownloadFormat, QRConfig } from "@/lib/types";
import { AlertTriangle, Download, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PixelMatchQR from "./PixelMatchQR";
import FrameWrapper from "./qr/FrameWrapper";
import QRLoading from "./qr/QRLoading";
import StandardQR from "./qr/StandardQR";

interface QRPreviewProps {
  config: QRConfig;
  logoDataUrl: string | null;
  pixelMatchImageUrl: string | null;
  onDownload: (format: DownloadFormat) => void;
  onReset: () => void;
  onUpdateConfig: (updates: Partial<QRConfig>) => void;
}

const QRPreview = ({
  config,
  logoDataUrl,
  pixelMatchImageUrl,
  onDownload,
  onReset,
  onUpdateConfig,
}: QRPreviewProps) => {
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pixelData, setPixelData] = useState<PixelData | null>(null);
  const [isProcessingPixels, setIsProcessingPixels] = useState(false);

  // Process pixel match image
  useEffect(() => {
    if (config.pixelMatchEnabled && config.pixelMatchImage) {
      setIsProcessingPixels(true);
      const qrMatrixSize = getQRMatrixSize(config.data);

      processImageForPixelMatching(config.pixelMatchImage, qrMatrixSize)
        .then((data) => {
          setPixelData(data);
          setIsProcessingPixels(false);
        })
        .catch((error) => {
          console.error("Error processing pixel match image:", error);
          setIsProcessingPixels(false);
        });
    } else {
      setPixelData(null);
    }
  }, [
    config.pixelMatchImage,
    config.pixelMatchEnabled,
    config.data,
    config.pixelMatchResolution,
  ]);

  const handleQrReady = (canvas: HTMLCanvasElement) => {
    qrCanvasRef.current = canvas;
  };

  const handleDownload = (format: DownloadFormat) => {
    if (qrCanvasRef.current) {
      const link = document.createElement("a");
      link.download = `qr-code.${format}`;
      link.href = qrCanvasRef.current.toDataURL("image/png");
      link.click();
    }
    onDownload(format);
  };

  // Determine QR rendering mode
  const isPixelMatchMode = config.pixelMatchEnabled && config.pixelMatchImage;
  const isProcessing = isPixelMatchMode && isProcessingPixels;
  const canRenderPixelMatch = isPixelMatchMode && pixelData;

  const renderQRCode = () => {
    if (isProcessing) {
      return <QRLoading size={config.size} />;
    }

    if (canRenderPixelMatch) {
      return (
        <PixelMatchQR
          config={config}
          pixelData={pixelData!}
          logoDataUrl={logoDataUrl}
          onReady={handleQrReady}
        />
      );
    }

    return (
      <StandardQR
        config={config}
        logoDataUrl={logoDataUrl}
        onReady={handleQrReady}
      />
    );
  };

  return (
    <div className="flex flex-col items-center space-y-6 md:space-y-8 px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      {/* Mode indicator */}
      {isPixelMatchMode && (
        <div className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 rounded-lg text-sm max-w-full">
          <AlertTriangle size={16} className="text-purple-600 flex-shrink-0" />
          <span className="text-purple-700 dark:text-purple-200 text-xs md:text-sm">
            Pixel Match Mode: Advanced styling is disabled
          </span>
        </div>
      )}

      <div className="card p-4 md:p-6 lg:p-8 w-full max-w-2xl mx-auto flex justify-center relative group">
        {/* Decorative elements - hidden on small screens for performance */}
        <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse-slow"></div>
        <div
          className="hidden md:block absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-yellow-600 rounded-full opacity-20 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="hidden md:block absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-600 rounded-full opacity-20 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="hidden md:block absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* QR Code Preview */}
        <div className="relative flex flex-col items-center max-w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="flex flex-col items-center relative z-10">
            <FrameWrapper
              frameStyle={config.frameStyle}
              frameText={config.frameText}
            >
              <div className="max-w-full overflow-hidden">{renderQRCode()}</div>
            </FrameWrapper>
          </div>
        </div>
      </div>

      {/* Download Buttons - Responsive layout */}
      <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 w-full max-w-lg">
        <button
          onClick={() => handleDownload("png")}
          className="btn-primary flex items-center justify-center space-x-2 group flex-1 sm:flex-none min-w-0"
        >
          <Download
            size={20}
            className="group-hover:animate-bounce flex-shrink-0"
          />
          <span className="text-sm md:text-base">Download PNG</span>
          <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
        <button
          onClick={() => handleDownload("svg")}
          className="btn-secondary flex items-center justify-center space-x-2 group flex-1 sm:flex-none min-w-0"
        >
          <Download
            size={20}
            className="group-hover:animate-bounce flex-shrink-0"
          />
          <span className="text-sm md:text-base">Download SVG</span>
          <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
        <button
          onClick={onReset}
          className="btn-neutral flex items-center justify-center space-x-2 group flex-1 sm:flex-none min-w-0"
        >
          <RotateCcw
            size={20}
            className="group-hover:rotate-180 transition-transform duration-300 flex-shrink-0"
          />
          <span className="text-sm md:text-base">Reset All</span>
          <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default QRPreview;
