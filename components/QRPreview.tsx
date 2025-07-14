import {
  PixelData,
  getQRMatrixSize,
  processImageForPixelMatching,
} from "@/lib/pixelMatcher";
import { DownloadFormat, QRConfig } from "@/lib/types";
import { Download, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { QrcodeCanvas } from "react-qrcode-pretty";
import PixelMatchQR from "./PixelMatchQR";

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

  // Process pixel match image when it changes
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

  // Handle QR ready callback to get canvas reference for downloads
  const handleQrReady = (canvas: HTMLCanvasElement) => {
    qrCanvasRef.current = canvas;
  };

  // Handle download with access to QR canvas
  const handleDownload = (format: DownloadFormat) => {
    if (qrCanvasRef.current) {
      const link = document.createElement("a");
      link.download = `qr-code.${format}`;

      if (format === "png") {
        link.href = qrCanvasRef.current.toDataURL("image/png");
      } else {
        // For SVG, we'll use PNG as fallback since react-qrcode-pretty uses canvas
        link.href = qrCanvasRef.current.toDataURL("image/png");
      }

      link.click();
    }
    onDownload(format);
  };

  // Helper function to render QR code based on pixel matching settings
  const renderQRCode = () => {
    // Show loading state while processing pixels
    if (
      config.pixelMatchEnabled &&
      config.pixelMatchImage &&
      isProcessingPixels
    ) {
      return (
        <div
          className="flex items-center justify-center bg-gray-100 rounded-lg"
          style={{ width: config.size, height: config.size }}
        >
          <div className="text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
            <p className="text-sm">Processing pixels...</p>
          </div>
        </div>
      );
    }

    // Use pixel matching if enabled and pixel data is available
    if (config.pixelMatchEnabled && pixelData && config.pixelMatchImage) {
      return (
        <PixelMatchQR
          config={config}
          pixelData={pixelData}
          logoDataUrl={logoDataUrl}
          onReady={handleQrReady}
        />
      );
    }

    // Default to standard QR code
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
        onReady={handleQrReady}
      />
    );
  };

  // Prepare color configuration for react-qrcode-pretty
  const qrColor =
    config.cornerEyeColor !== config.dotColor
      ? {
          eyes: config.cornerEyeColor,
          body: config.dotColor,
        }
      : config.dotColor;

  const qrVariant =
    config.eyeVariant !== config.qrVariant
      ? {
          eyes: config.eyeVariant,
          body: config.qrVariant,
        }
      : config.qrVariant;

  return (
    <div className="lg:col-span-2 flex flex-col items-center space-y-8 lg:sticky lg:top-8 lg:self-start">
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

        {/* Preview Container */}
        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          {/* QR Code Only Preview with Frame */}
          <div className="flex flex-col items-center">
            {/* Frame visuals */}
            {config.frameStyle === "scan-me" && (
              <>
                <div className="relative p-4 border-4 border-black rounded-2xl bg-white shadow-inner">
                  {renderQRCode()}
                </div>
                <div className="mt-2 px-4 py-2 bg-black text-white rounded-b-xl font-bold text-lg shadow-lg relative -top-2">
                  {config.frameText || "SCAN ME"}
                </div>
              </>
            )}
            {config.frameStyle === "speech-bubble" && (
              <>
                <div className="relative p-4 border-4 border-blue-400 rounded-2xl bg-white shadow-inner">
                  {renderQRCode()}
                </div>
                <div className="relative mt-2">
                  <div className="inline-block px-4 py-2 bg-blue-400 text-white rounded-full font-bold text-lg shadow-lg relative">
                    {config.frameText || "SCAN ME"}
                  </div>
                  <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-blue-400 rotate-45 -translate-x-1/2"></div>
                </div>
              </>
            )}
            {config.frameStyle === "rounded-box" && (
              <>
                <div className="relative p-4 border-4 border-purple-400 rounded-2xl bg-white shadow-inner">
                  {renderQRCode()}
                </div>
                <div className="mt-2 px-4 py-2 bg-purple-400 text-white rounded-xl font-bold text-lg shadow-lg">
                  {config.frameText || "SCAN ME"}
                </div>
              </>
            )}
            {config.frameStyle === "border" && (
              <div className="relative p-4 border-4 border-gray-400 rounded-2xl bg-white shadow-inner">
                {renderQRCode()}
              </div>
            )}
            {config.frameStyle === "none" && (
              <div className="relative p-4 rounded-2xl bg-white shadow-inner">
                {renderQRCode()}
              </div>
            )}
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
