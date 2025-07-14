"use client";

import { DownloadFormat, QRGeneratorProps } from "@/lib/types";
import { Download, RotateCcw, Upload } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import Select from "./Select";

const QRCodeGenerator = ({
  config,
  updateConfig,
  resetConfig,
}: QRGeneratorProps) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);

  // Initialize QR code instance
  useEffect(() => {
    if (typeof window !== "undefined") {
      qrCodeInstance.current = new QRCodeStyling({
        width: config.size,
        height: config.size,
        type: "canvas",
        data: config.data,
        margin: config.margin,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "Q",
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: config.logoSize,
          margin: config.logoMargin,
          crossOrigin: "anonymous",
        },
        dotsOptions: {
          color: config.dotColor,
          type: config.dotShape,
        },
        backgroundOptions: {
          color: config.backgroundTransparent
            ? "transparent"
            : config.backgroundColor,
        },
        cornersSquareOptions: {
          color: config.cornerEyeColor,
          type: config.cornerEyeStyle,
        },
        cornersDotOptions: {
          color: config.cornerEyeInnerColor,
          type: config.cornerEyeStyle,
        },
      });

      if (qrCodeRef.current) {
        qrCodeRef.current.innerHTML = "";
        qrCodeInstance.current.append(qrCodeRef.current);
      }
    }
  }, []);

  // Update QR code when config changes (with debounce for performance)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (qrCodeInstance.current) {
        qrCodeInstance.current.update({
          width: config.size,
          height: config.size,
          data: config.data,
          margin: config.margin,
          image: logoDataUrl || undefined,
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: config.logoSize,
            margin: config.logoMargin,
            crossOrigin: "anonymous",
          },
          dotsOptions: {
            color: config.dotColor,
            type: config.dotShape,
          },
          backgroundOptions: {
            color: config.backgroundTransparent
              ? "transparent"
              : config.backgroundColor,
          },
          cornersSquareOptions: {
            color: config.cornerEyeColor,
            type: config.cornerEyeStyle,
          },
          cornersDotOptions: {
            color: config.cornerEyeInnerColor,
            type: config.cornerEyeStyle,
          },
        });
      }
    }, 150); // 150ms debounce for better performance

    return () => clearTimeout(timeoutId);
  }, [config, logoDataUrl]);

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setLogoDataUrl(dataUrl);
        updateConfig({ logo: file });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove logo
  const removeLogo = () => {
    setLogoDataUrl(null);
    updateConfig({ logo: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Download QR code
  const downloadQR = (format: DownloadFormat) => {
    if (qrCodeInstance.current) {
      const extension = format === "png" ? "png" : "svg";
      qrCodeInstance.current.download({
        name: `qr-code`,
        extension,
      });
    }
  };

  const dotShapeOptions = [
    { value: "square", label: "Square" },
    { value: "dots", label: "Dots" },
    { value: "rounded", label: "Rounded" },
    { value: "extra-rounded", label: "Extra Rounded" },
  ];

  const cornerEyeStyleOptions = [
    { value: "square", label: "Square" },
    { value: "dot", label: "Dot" },
    { value: "extra-rounded", label: "Extra Rounded" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {/* QR Code Preview */}
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

          {/* QR Code Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div
              ref={qrCodeRef}
              className="relative flex justify-center items-center bg-white rounded-2xl shadow-inner p-4"
              style={{
                width: config.size + 32,
                height: config.size + 32,
                minWidth: config.size + 32,
                minHeight: config.size + 32,
              }}
            />
          </div>
        </div>

        {/* Download Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => downloadQR("png")}
            className="btn-primary flex items-center space-x-2 group"
          >
            <Download size={20} className="group-hover:animate-bounce" />
            <span>Download PNG</span>
            <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
          <button
            onClick={() => downloadQR("svg")}
            className="btn-secondary flex items-center space-x-2 group"
          >
            <Download size={20} className="group-hover:animate-bounce" />
            <span>Download SVG</span>
            <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </button>
          <button
            onClick={resetConfig}
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

      {/* Controls Panel */}
      <div className="card p-8 space-y-8 relative overflow-hidden lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:sticky lg:top-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

        <div className="relative">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            🎨 Customize QR Code
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-16 rounded-full"></div>
        </div>

        {/* Data Input */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            📝 Data (Text/URL)
          </label>
          <div className="relative">
            <textarea
              value={config.data}
              onChange={(e) => updateConfig({ data: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white"
              rows={3}
              placeholder="Enter your text, URL, or any data..."
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {config.data.length} characters
            </div>
          </div>
        </div>

        {/* Size */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-800">
              📏 Size
            </label>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {config.size}px
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="200"
              max="500"
              value={config.size}
              onChange={(e) => updateConfig({ size: parseInt(e.target.value) })}
              className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Margin */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-800">
              📐 Margin
            </label>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {config.margin}px
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="50"
              value={config.margin}
              onChange={(e) =>
                updateConfig({ margin: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Colors */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <span>🌈</span>
              <span>Colors</span>
            </h3>
            <div className="space-y-4">
              <ColorPicker
                color={config.dotColor}
                onChange={(color) => updateConfig({ dotColor: color })}
                label="Dot Color"
              />

              <ColorPicker
                color={config.cornerEyeColor}
                onChange={(color) => updateConfig({ cornerEyeColor: color })}
                label="Corner Eye Color"
              />

              <ColorPicker
                color={config.cornerEyeInnerColor}
                onChange={(color) =>
                  updateConfig({ cornerEyeInnerColor: color })
                }
                label="Corner Eye Inner Color"
              />
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <span>🖼️</span>
            <span>Background</span>
          </h3>
          <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300">
            <div className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                checked={config.backgroundTransparent}
                onChange={(e) =>
                  updateConfig({ backgroundTransparent: e.target.checked })
                }
                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label className="text-sm font-semibold text-gray-800">
                Transparent Background
              </label>
            </div>
            {!config.backgroundTransparent && (
              <ColorPicker
                color={config.backgroundColor}
                onChange={(color) => updateConfig({ backgroundColor: color })}
                label="Background Color"
              />
            )}
          </div>
        </div>

        {/* Shapes */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <span>⭐</span>
              <span>Shapes</span>
            </h3>
            <div className="space-y-4">
              <Select
                value={config.dotShape}
                onChange={(value) => updateConfig({ dotShape: value as any })}
                options={dotShapeOptions}
                label="Dot Shape"
              />

              <Select
                value={config.cornerEyeStyle}
                onChange={(value) =>
                  updateConfig({ cornerEyeStyle: value as any })
                }
                options={cornerEyeStyleOptions}
                label="Corner Eye Style"
              />
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <span>🖼️</span>
            <span>Logo</span>
          </h3>
          <div className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="relative group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-2 border-blue-200 rounded-xl hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 transition-all duration-300 w-full justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <Upload
                size={20}
                className="relative z-10 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="relative z-10 font-semibold">
                Choose Logo Image
              </span>
            </button>
            {logoDataUrl && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <span className="text-sm font-medium text-green-800">
                      Logo uploaded successfully
                    </span>
                  </div>
                  <button
                    onClick={removeLogo}
                    className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-all duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Logo Settings */}
        {logoDataUrl && (
          <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <span>⚙️</span>
                <span>Logo Settings</span>
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-800">
                  🔍 Logo Size
                </label>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                  {Math.round(config.logoSize * 100)}%
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0.1"
                  max="0.5"
                  step="0.05"
                  value={config.logoSize}
                  onChange={(e) =>
                    updateConfig({ logoSize: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-800">
                  📐 Logo Margin
                </label>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {config.logoMargin}px
                </span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={config.logoMargin}
                  onChange={(e) =>
                    updateConfig({ logoMargin: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
