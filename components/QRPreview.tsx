import { DownloadFormat, QRConfig } from "@/lib/types";
import { Download, Image, QrCode, RotateCcw } from "lucide-react";
import { useRef, useState } from "react";
import { QrcodeCanvas } from "react-qrcode-pretty";

interface QRPreviewProps {
  config: QRConfig;
  logoDataUrl: string | null;
  previewImageUrl: string | null;
  onDownload: (format: DownloadFormat) => void;
  onReset: () => void;
  onUpdateConfig: (updates: Partial<QRConfig>) => void;
}

// Device mockup components
const WatchMockup = ({
  qrDataUrl,
  config,
}: {
  qrDataUrl: string | null;
  config: QRConfig;
}) => (
  <div className="relative">
    {/* Watch body */}
    <div className="w-48 h-60 mx-auto">
      {/* Watch strap top */}
      <div className="w-8 h-16 mx-auto bg-gray-800 rounded-t-full relative">
        <div className="absolute inset-2 bg-gray-700 rounded-t-full"></div>
      </div>

      {/* Watch case */}
      <div className="w-36 h-44 mx-auto bg-gray-900 rounded-3xl shadow-2xl relative border-4 border-gray-700">
        {/* Screen */}
        <div className="absolute inset-3 bg-black rounded-2xl overflow-hidden">
          {/* Screen content area */}
          <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black relative overflow-hidden rounded-2xl">
            {/* Watch UI elements */}
            <div className="absolute top-2 left-2 right-2 h-1 bg-green-400 rounded-full opacity-70"></div>
            <div className="absolute top-4 right-2 text-white text-xs font-mono">
              12:34
            </div>

            {/* QR Code positioned on watch screen */}
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="QR Code on watch"
                className="absolute transition-all duration-200"
                style={{
                  left: `${config.qrPositionX}%`,
                  top: `${config.qrPositionY}%`,
                  transform: `translate(-50%, -50%) scale(${
                    config.qrScale * 0.6
                  })`,
                  width: Math.min(80, config.size * 0.25),
                  height: Math.min(80, config.size * 0.25),
                }}
                draggable={false}
              />
            )}
          </div>
        </div>

        {/* Digital crown */}
        <div className="absolute right-0 top-8 w-2 h-6 bg-gray-600 rounded-l-lg"></div>
        <div className="absolute right-0 top-16 w-1.5 h-4 bg-gray-600 rounded-l-lg"></div>
      </div>

      {/* Watch strap bottom */}
      <div className="w-8 h-16 mx-auto bg-gray-800 rounded-b-full relative">
        <div className="absolute inset-2 bg-gray-700 rounded-b-full"></div>
      </div>
    </div>
  </div>
);

const PhoneMockup = ({
  qrDataUrl,
  config,
}: {
  qrDataUrl: string | null;
  config: QRConfig;
}) => (
  <div className="relative w-64 h-96 mx-auto">
    {/* Phone body */}
    <div className="w-full h-full bg-gray-900 rounded-3xl shadow-2xl border-4 border-gray-700 relative">
      {/* Screen */}
      <div className="absolute inset-4 bg-black rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-blue-50 to-white relative">
          {/* Status bar */}
          <div className="h-6 bg-black flex items-center justify-between px-4">
            <div className="text-white text-xs">9:41</div>
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>

          {/* QR Code positioned on phone screen */}
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="QR Code on phone"
              className="absolute transition-all duration-200"
              style={{
                left: `${config.qrPositionX}%`,
                top: `${config.qrPositionY}%`,
                transform: `translate(-50%, -50%) scale(${config.qrScale})`,
                width: config.size * 0.4,
                height: config.size * 0.4,
              }}
              draggable={false}
            />
          )}
        </div>
      </div>

      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
    </div>
  </div>
);

const TabletMockup = ({
  qrDataUrl,
  config,
}: {
  qrDataUrl: string | null;
  config: QRConfig;
}) => (
  <div className="relative w-80 h-56 mx-auto">
    {/* Tablet body */}
    <div className="w-full h-full bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-700 relative">
      {/* Screen */}
      <div className="absolute inset-3 bg-black rounded-xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 relative">
          {/* QR Code positioned on tablet screen */}
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="QR Code on tablet"
              className="absolute transition-all duration-200"
              style={{
                left: `${config.qrPositionX}%`,
                top: `${config.qrPositionY}%`,
                transform: `translate(-50%, -50%) scale(${
                  config.qrScale * 1.2
                })`,
                width: config.size * 0.5,
                height: config.size * 0.5,
              }}
              draggable={false}
            />
          )}
        </div>
      </div>

      {/* Home button */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-600 rounded-full"></div>
    </div>
  </div>
);

const LaptopMockup = ({
  qrDataUrl,
  config,
}: {
  qrDataUrl: string | null;
  config: QRConfig;
}) => (
  <div className="relative w-96 mx-auto">
    {/* Laptop screen */}
    <div className="w-full h-64 bg-gray-900 rounded-t-2xl shadow-2xl border-4 border-gray-700 relative">
      {/* Screen */}
      <div className="absolute inset-3 bg-black rounded-xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-b from-blue-900 to-purple-900 relative">
          {/* Browser UI */}
          <div className="h-8 bg-gray-800 flex items-center px-4 space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 bg-gray-700 rounded text-xs text-gray-300 px-2 py-1">
              https://qr-generator.com
            </div>
          </div>

          {/* QR Code positioned on laptop screen */}
          {qrDataUrl && (
            <img
              src={qrDataUrl}
              alt="QR Code on laptop"
              className="absolute transition-all duration-200"
              style={{
                left: `${config.qrPositionX}%`,
                top: `${config.qrPositionY}%`,
                transform: `translate(-50%, -50%) scale(${
                  config.qrScale * 1.5
                })`,
                width: config.size * 0.6,
                height: config.size * 0.6,
              }}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>

    {/* Laptop base */}
    <div className="w-full h-4 bg-gray-800 rounded-b-2xl relative">
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gray-700 rounded-b-2xl"></div>
    </div>
  </div>
);

const QRPreview = ({
  config,
  logoDataUrl,
  previewImageUrl,
  onDownload,
  onReset,
  onUpdateConfig,
}: QRPreviewProps) => {
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Handle QR ready callback to get canvas reference for downloads
  const handleQrReady = (canvas: HTMLCanvasElement) => {
    qrCanvasRef.current = canvas;

    // Generate QR data URL for image preview mode
    if (config.previewMode === "image-preview") {
      const dataUrl = canvas.toDataURL("image/png");
      setQrDataUrl(dataUrl);
    }
  };

  // Handle mouse events for dragging QR code in image preview mode
  const handleMouseDown = (e: React.MouseEvent) => {
    if (config.previewMode === "image-preview") {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && config.previewMode === "image-preview") {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newX = Math.max(
        0,
        Math.min(100, config.qrPositionX + deltaX * 0.1)
      );
      const newY = Math.max(
        0,
        Math.min(100, config.qrPositionY + deltaY * 0.1)
      );

      onUpdateConfig({
        qrPositionX: newX,
        qrPositionY: newY,
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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

  const togglePreviewMode = () => {
    const newMode =
      config.previewMode === "qr-only" ? "image-preview" : "qr-only";
    onUpdateConfig({ previewMode: newMode });
  };

  // Handle device template selection
  const handleTemplateSelect = (template: string) => {
    onUpdateConfig({
      previewTemplate: template as any,
      previewMode: "image-preview",
    });
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
      {/* Preview Mode Toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePreviewMode}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            config.previewMode === "qr-only"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <QrCode size={20} />
          <span>QR Only</span>
        </button>
        <button
          onClick={togglePreviewMode}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
            config.previewMode === "image-preview"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          <Image size={20} />
          <span>Image Preview</span>
        </button>
      </div>

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
          {config.previewMode === "qr-only" ? (
            // QR Code Only Preview with Frame
            <div className="flex flex-col items-center">
              {/* Frame visuals */}
              {config.frameStyle === "scan-me" && (
                <>
                  <div className="relative p-4 border-4 border-black rounded-2xl bg-white shadow-inner">
                    <QrcodeCanvas
                      value={config.data}
                      size={config.size}
                      margin={config.margin}
                      color={qrColor}
                      variant={qrVariant}
                      colorEffect={config.colorEffect}
                      divider={config.divider}
                      bgColor={
                        config.backgroundTransparent
                          ? "transparent"
                          : config.backgroundColor
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
                  </div>
                  <div className="mt-2 px-4 py-2 bg-black text-white rounded-b-xl font-bold text-lg shadow-lg relative -top-2">
                    {config.frameText || "SCAN ME"}
                  </div>
                </>
              )}
              {config.frameStyle === "speech-bubble" && (
                <>
                  <div className="relative p-4 border-4 border-blue-400 rounded-2xl bg-white shadow-inner">
                    <QrcodeCanvas
                      value={config.data}
                      size={config.size}
                      margin={config.margin}
                      color={qrColor}
                      variant={qrVariant}
                      colorEffect={config.colorEffect}
                      divider={config.divider}
                      bgColor={
                        config.backgroundTransparent
                          ? "transparent"
                          : config.backgroundColor
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
                    <QrcodeCanvas
                      value={config.data}
                      size={config.size}
                      margin={config.margin}
                      color={qrColor}
                      variant={qrVariant}
                      colorEffect={config.colorEffect}
                      divider={config.divider}
                      bgColor={
                        config.backgroundTransparent
                          ? "transparent"
                          : config.backgroundColor
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
                  </div>
                  <div className="mt-2 px-4 py-2 bg-purple-400 text-white rounded-xl font-bold text-lg shadow-lg">
                    {config.frameText || "SCAN ME"}
                  </div>
                </>
              )}
              {config.frameStyle === "border" && (
                <div className="relative p-4 border-4 border-gray-400 rounded-2xl bg-white shadow-inner">
                  <QrcodeCanvas
                    value={config.data}
                    size={config.size}
                    margin={config.margin}
                    color={qrColor}
                    variant={qrVariant}
                    colorEffect={config.colorEffect}
                    divider={config.divider}
                    bgColor={
                      config.backgroundTransparent
                        ? "transparent"
                        : config.backgroundColor
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
                </div>
              )}
              {config.frameStyle === "none" && (
                <div className="relative p-4 rounded-2xl bg-white shadow-inner">
                  <QrcodeCanvas
                    value={config.data}
                    size={config.size}
                    margin={config.margin}
                    color={qrColor}
                    variant={qrVariant}
                    colorEffect={config.colorEffect}
                    divider={config.divider}
                    bgColor={
                      config.backgroundTransparent
                        ? "transparent"
                        : config.backgroundColor
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
                </div>
              )}
            </div>
          ) : (
            // Image Preview Mode
            <div
              className="relative bg-white rounded-2xl shadow-inner p-4 overflow-hidden cursor-move"
              style={{
                width: 600,
                height: 400,
                minWidth: 600,
                minHeight: 400,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {previewImageUrl ? (
                <>
                  <img
                    src={previewImageUrl}
                    alt="Preview background"
                    className="w-full h-full object-cover rounded-lg"
                    draggable={false}
                  />
                  {qrDataUrl && (
                    <img
                      src={qrDataUrl}
                      alt="QR Code"
                      className="absolute pointer-events-none transition-all duration-200"
                      style={{
                        left: `${config.qrPositionX}%`,
                        top: `${config.qrPositionY}%`,
                        transform: `translate(-50%, -50%) scale(${config.qrScale})`,
                        width: config.size * 0.3,
                        height: config.size * 0.3,
                      }}
                      draggable={false}
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <Image size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Upload an image to preview your QR code design</p>
                  </div>
                </div>
              )}
            </div>
          )}
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
