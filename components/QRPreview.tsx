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
    <div className="lg:col-span-2 flex flex-col items-center space-y-8 lg:sticky lg:top-8 lg:self-start">
      {/* Mode indicator */}
      {isPixelMatchMode && (
        <div className="flex items-center space-x-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-lg text-sm">
          <AlertTriangle size={16} className="text-purple-600" />
          <span className="text-purple-700">
            Pixel Match Mode: Advanced styling is disabled
          </span>
        </div>
      )}

      <div className="card p-8 w-full flex justify-center relative group">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse-slow"></div>
        <div
          className="absolute -top-4 -right-4 w-6 h-6 bg-gradient-to-br from-pink-400 to-yellow-600 rounded-full opacity-20 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-green-400 to-blue-600 rounded-full opacity-20 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-20 animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* QR Code Preview */}
        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="flex flex-col items-center">
            <FrameWrapper
              frameStyle={config.frameStyle}
              frameText={config.frameText}
            >
              {renderQRCode()}
            </FrameWrapper>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => handleDownload("png")}
          className="btn-primary flex items-center space-x-2 group"
        >
          <Download size={20} className="group-hover:animate-bounce" />
          <span>Download PNG</span>
          <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
        <button
          onClick={() => handleDownload("svg")}
          className="btn-secondary flex items-center space-x-2 group"
        >
          <Download size={20} className="group-hover:animate-bounce" />
          <span>Download SVG</span>
          <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
        <button
          onClick={onReset}
          className="btn-neutral flex items-center space-x-2 group"
        >
          <RotateCcw
            size={20}
            className="group-hover:rotate-180 transition-transform duration-300"
          />
          <span>Reset All</span>
          <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default QRPreview;
