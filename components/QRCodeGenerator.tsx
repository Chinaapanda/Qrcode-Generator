"use client";

import { DownloadFormat, QRGeneratorProps } from "@/lib/types";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import QRPreview from "./QRPreview";

const QRCodeGenerator = ({
  config,
  updateConfig,
  resetConfig,
}: QRGeneratorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewImageInputRef = useRef<HTMLInputElement>(null);
  const pixelMatchImageInputRef = useRef<HTMLInputElement>(null);
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [pixelMatchImageUrl, setPixelMatchImageUrl] = useState<string | null>(
    null
  );

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

  // Handle preview image upload
  const handlePreviewImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPreviewImageUrl(dataUrl);
        updateConfig({ previewImage: file, previewMode: "image-preview" });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle pixel match image upload
  const handlePixelMatchImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setPixelMatchImageUrl(dataUrl);
        updateConfig({ pixelMatchImage: file, pixelMatchEnabled: true });
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

  // Remove preview image
  const removePreviewImage = () => {
    setPreviewImageUrl(null);
    updateConfig({ previewImage: null, previewMode: "qr-only" });
    if (previewImageInputRef.current) {
      previewImageInputRef.current.value = "";
    }
  };

  // Remove pixel match image
  const removePixelMatchImage = () => {
    setPixelMatchImageUrl(null);
    updateConfig({ pixelMatchImage: null, pixelMatchEnabled: false });
    if (pixelMatchImageInputRef.current) {
      pixelMatchImageInputRef.current.value = "";
    }
  };

  // Download QR code (placeholder - actual download handled in QRPreview)
  const downloadQR = (format: DownloadFormat) => {
    // This is handled by QRPreview component
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
      <QRPreview
        config={config}
        logoDataUrl={logoDataUrl}
        previewImageUrl={previewImageUrl}
        pixelMatchImageUrl={pixelMatchImageUrl}
        onDownload={downloadQR}
        onReset={resetConfig}
        onUpdateConfig={updateConfig}
      />

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

        {/* Preview Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            🖼️ Preview Background Image
          </label>
          <div className="space-y-3">
            <button
              onClick={() => previewImageInputRef.current?.click()}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group"
            >
              <Upload
                size={20}
                className="text-gray-400 group-hover:text-blue-500"
              />
              <span className="text-gray-600 group-hover:text-blue-600">
                Upload Preview Image
              </span>
            </button>
            <input
              ref={previewImageInputRef}
              type="file"
              accept="image/*"
              onChange={handlePreviewImageUpload}
              className="hidden"
            />
            {previewImageUrl && (
              <div className="relative">
                <img
                  src={previewImageUrl}
                  alt="Preview background"
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={removePreviewImage}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pixel Match Image Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            🎨 Pixel Match Image
          </label>
          <p className="text-xs text-gray-600 mb-3">
            Upload an image to match QR code dots with image pixels. Each QR dot
            will take the color of the corresponding pixel.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => pixelMatchImageInputRef.current?.click()}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 group"
            >
              <Upload
                size={20}
                className="text-gray-400 group-hover:text-purple-500"
              />
              <span className="text-gray-600 group-hover:text-purple-600">
                Upload Pixel Match Image
              </span>
            </button>
            <input
              ref={pixelMatchImageInputRef}
              type="file"
              accept="image/*"
              onChange={handlePixelMatchImageUpload}
              className="hidden"
            />
            {pixelMatchImageUrl && (
              <div className="relative">
                <img
                  src={pixelMatchImageUrl}
                  alt="Pixel match"
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={removePixelMatchImage}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Pixel Match Controls (only show when pixel match image is uploaded) */}
        {config.pixelMatchEnabled && config.pixelMatchImage && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">
              🎯 Pixel Matching Settings
            </h3>

            <div className="space-y-3">
              {/* Enable/Disable Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-600">
                  Enable Pixel Matching
                </label>
                <button
                  onClick={() =>
                    updateConfig({
                      pixelMatchEnabled: !config.pixelMatchEnabled,
                    })
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.pixelMatchEnabled ? "bg-purple-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.pixelMatchEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Opacity Control */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Pixel Opacity: {(config.pixelMatchOpacity * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={config.pixelMatchOpacity}
                  onChange={(e) =>
                    updateConfig({
                      pixelMatchOpacity: parseFloat(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Resolution Control */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Resolution: {config.pixelMatchResolution}x
                  {config.pixelMatchResolution}
                </label>
                <input
                  type="range"
                  min="15"
                  max="50"
                  step="5"
                  value={config.pixelMatchResolution}
                  onChange={(e) =>
                    updateConfig({
                      pixelMatchResolution: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Blending Mode */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Blending Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "normal", label: "Normal" },
                    { value: "multiply", label: "Multiply" },
                    { value: "overlay", label: "Overlay" },
                    { value: "screen", label: "Screen" },
                  ].map((mode) => (
                    <button
                      key={mode.value}
                      className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all duration-200 ${
                        config.pixelMatchBlending === mode.value
                          ? "bg-purple-500 text-white border-purple-600 shadow"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-purple-50"
                      }`}
                      onClick={() =>
                        updateConfig({ pixelMatchBlending: mode.value as any })
                      }
                      type="button"
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* QR Position Controls (only show in image preview mode) */}
        {config.previewMode === "image-preview" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">
              🎯 QR Code Position
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Horizontal Position: {config.qrPositionX.toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.qrPositionX}
                  onChange={(e) =>
                    updateConfig({ qrPositionX: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Vertical Position: {config.qrPositionY.toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.qrPositionY}
                  onChange={(e) =>
                    updateConfig({ qrPositionY: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Scale: {(config.qrScale * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.3"
                  max="2"
                  step="0.1"
                  value={config.qrScale}
                  onChange={(e) =>
                    updateConfig({ qrScale: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </div>
        )}

        {/* Size Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">
            📐 Size Settings
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Size: {config.size}px
              </label>
              <input
                type="range"
                min="200"
                max="800"
                value={config.size}
                onChange={(e) =>
                  updateConfig({ size: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Margin: {config.margin}px
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={config.margin}
                onChange={(e) =>
                  updateConfig({ margin: parseInt(e.target.value) })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>

        {/* Color Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">🎨 Colors</h3>
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              color={config.dotColor}
              onChange={(color) => updateConfig({ dotColor: color })}
              label="Dots"
            />
            <ColorPicker
              color={config.backgroundColor}
              onChange={(color) => updateConfig({ backgroundColor: color })}
              label="Background"
            />
            <ColorPicker
              color={config.cornerEyeColor}
              onChange={(color) => updateConfig({ cornerEyeColor: color })}
              label="Corner Eyes"
            />
            <ColorPicker
              color={config.cornerEyeInnerColor}
              onChange={(color) => updateConfig({ cornerEyeInnerColor: color })}
              label="Eye Centers"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="transparent-bg"
              checked={config.backgroundTransparent}
              onChange={(e) =>
                updateConfig({ backgroundTransparent: e.target.checked })
              }
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="transparent-bg" className="text-sm text-gray-700">
              Transparent Background
            </label>
          </div>
        </div>

        {/* QR Styling Controls */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">✨ QR Styling</h3>

          {/* QR Variant */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              QR Body Style
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: "standard", label: "■", desc: "Standard" },
                { value: "rounded", label: "◼", desc: "Rounded" },
                { value: "dots", label: "●", desc: "Dots" },
                { value: "circle", label: "○", desc: "Circle" },
                { value: "fluid", label: "~", desc: "Fluid" },
                { value: "gravity", label: "▼", desc: "Gravity" },
                { value: "morse", label: "⫿", desc: "Morse" },
                { value: "shower", label: "⫶", desc: "Shower" },
              ].map((variant) => (
                <button
                  key={variant.value}
                  className={`w-full h-12 flex flex-col items-center justify-center rounded-lg border text-xs transition-all duration-200 ${
                    config.qrVariant === variant.value
                      ? "bg-blue-500 border-blue-600 shadow text-white"
                      : "bg-white border-gray-300 hover:bg-blue-50 text-gray-700"
                  }`}
                  onClick={() =>
                    updateConfig({ qrVariant: variant.value as any })
                  }
                  type="button"
                  title={variant.desc}
                >
                  <span className="text-lg">{variant.label}</span>
                  <span className="text-xs mt-1">{variant.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Eye Variant */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Corner Eye Style
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: "standard", label: "▣", desc: "Standard" },
                { value: "rounded", label: "▢", desc: "Rounded" },
                { value: "dots", label: "◉", desc: "Dots" },
                { value: "circle", label: "◯", desc: "Circle" },
                { value: "fluid", label: "⬚", desc: "Fluid" },
                { value: "gravity", label: "⬇", desc: "Gravity" },
              ].map((variant) => (
                <button
                  key={variant.value}
                  className={`w-full h-12 flex flex-col items-center justify-center rounded-lg border text-xs transition-all duration-200 ${
                    config.eyeVariant === variant.value
                      ? "bg-purple-500 border-purple-600 shadow text-white"
                      : "bg-white border-gray-300 hover:bg-purple-50 text-gray-700"
                  }`}
                  onClick={() =>
                    updateConfig({ eyeVariant: variant.value as any })
                  }
                  type="button"
                  title={variant.desc}
                >
                  <span className="text-lg">{variant.label}</span>
                  <span className="text-xs mt-1">{variant.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Color Effects */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">
              Color Effects
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "none", label: "None" },
                { value: "gradient-dark-vertical", label: "Gradient ↕" },
                { value: "gradient-dark-horizontal", label: "Gradient ↔" },
                { value: "gradient-dark-diagonal", label: "Gradient ↗" },
                { value: "colored", label: "Colored" },
                { value: "shades", label: "Shades" },
              ].map((effect) => (
                <button
                  key={effect.value}
                  className={`px-2 py-1 rounded-lg border text-xs font-medium transition-all duration-200 ${
                    config.colorEffect === effect.value
                      ? "bg-emerald-500 text-white border-emerald-600 shadow"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                  }`}
                  onClick={() =>
                    updateConfig({ colorEffect: effect.value as any })
                  }
                  type="button"
                >
                  {effect.label}
                </button>
              ))}
            </div>
          </div>

          {/* Style Options */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="divider"
                checked={config.divider}
                onChange={(e) => updateConfig({ divider: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="divider" className="text-sm text-gray-700">
                Add separation between dots
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="bg-rounded"
                checked={config.bgRounded}
                onChange={(e) => updateConfig({ bgRounded: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="bg-rounded" className="text-sm text-gray-700">
                Rounded background
              </label>
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            📸 Logo (Optional)
          </label>
          <div className="space-y-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 group"
            >
              <Upload
                size={20}
                className="text-gray-400 group-hover:text-blue-500"
              />
              <span className="text-gray-600 group-hover:text-blue-600">
                Upload Logo
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            {logoDataUrl && (
              <div className="relative">
                <img
                  src={logoDataUrl}
                  alt="Logo preview"
                  className="w-full h-24 object-contain rounded-lg border bg-gray-50"
                />
                <button
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Logo Size Control */}
          {logoDataUrl && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Logo Size: {(config.logoSize * 100).toFixed(0)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.1"
                  value={config.logoSize}
                  onChange={(e) =>
                    updateConfig({ logoSize: parseFloat(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Logo Margin: {config.logoMargin}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={config.logoMargin}
                  onChange={(e) =>
                    updateConfig({ logoMargin: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          )}
        </div>

        {/* Frame Controls */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            🖼️ Frame
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "none", label: "None" },
              { value: "scan-me", label: "Scan Me" },
              { value: "speech-bubble", label: "Speech Bubble" },
              { value: "rounded-box", label: "Rounded Box" },
              { value: "border", label: "Border" },
            ].map((frame) => (
              <button
                key={frame.value}
                className={`px-3 py-1 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  config.frameStyle === frame.value
                    ? "bg-blue-500 text-white border-blue-600 shadow"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"
                }`}
                onClick={() => updateConfig({ frameStyle: frame.value as any })}
                type="button"
              >
                {frame.label}
              </button>
            ))}
          </div>
          {config.frameStyle !== "none" && (
            <input
              type="text"
              value={config.frameText}
              onChange={(e) => updateConfig({ frameText: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg mt-2 text-sm"
              placeholder="Frame text (e.g. SCAN ME)"
              maxLength={24}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
