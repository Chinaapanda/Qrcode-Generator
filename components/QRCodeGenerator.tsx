"use client";

import { DownloadFormat, QRGeneratorProps } from "@/lib/types";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import { useFileUpload } from "../hooks/useFileUpload";
import { useQRModes } from "../hooks/useQRModes";
import ColorPicker from "./ColorPicker";
import QRPreview from "./QRPreview";
import ButtonGrid, { ButtonGridOption } from "./ui/ButtonGrid";
import ControlSection from "./ui/ControlSection";
import ModeWarning from "./ui/ModeWarning";
import RangeControl from "./ui/RangeControl";
import ToggleControl from "./ui/ToggleControl";

const QRCodeGenerator = ({
  config,
  updateConfig,
  resetConfig,
}: QRGeneratorProps) => {
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [pixelMatchImageUrl, setPixelMatchImageUrl] = useState<string | null>(
    null
  );

  // Use custom hooks
  const {
    isPixelMatchMode,
    hasAdvancedStyling,
    disablePixelMatching,
    disableAdvancedStyling,
  } = useQRModes({ config, updateConfig });

  const logoUpload = useFileUpload({
    onFileSelect: (file, dataUrl) => {
      setLogoDataUrl(dataUrl);
      updateConfig({ logo: file });
    },
    onFileRemove: () => {
      setLogoDataUrl(null);
      updateConfig({ logo: null });
    },
  });

  const pixelMatchUpload = useFileUpload({
    onFileSelect: (file, dataUrl) => {
      setPixelMatchImageUrl(dataUrl);
      updateConfig({ pixelMatchImage: file, pixelMatchEnabled: true });
    },
    onFileRemove: () => {
      setPixelMatchImageUrl(null);
      updateConfig({ pixelMatchImage: null, pixelMatchEnabled: false });
    },
  });

  const downloadQR = (format: DownloadFormat) => {
    // Handled by QRPreview component
  };

  // Button grid options
  const qrVariantOptions: ButtonGridOption[] = [
    { value: "standard", label: "■", desc: "Standard" },
    { value: "rounded", label: "◼", desc: "Rounded" },
    { value: "dots", label: "●", desc: "Dots" },
    { value: "circle", label: "○", desc: "Circle" },
    { value: "fluid", label: "~", desc: "Fluid" },
    { value: "gravity", label: "▼", desc: "Gravity" },
    { value: "morse", label: "⫿", desc: "Morse" },
    { value: "shower", label: "⫶", desc: "Shower" },
  ];

  const eyeVariantOptions: ButtonGridOption[] = [
    { value: "standard", label: "👁", desc: "Standard" },
    { value: "rounded", label: "⬯", desc: "Rounded" },
    { value: "dots", label: "⚬", desc: "Dots" },
    { value: "circle", label: "○", desc: "Circle" },
    { value: "fluid", label: "~", desc: "Fluid" },
    { value: "gravity", label: "▼", desc: "Gravity" },
  ];

  const colorEffectOptions: ButtonGridOption[] = [
    { value: "none", label: "○", desc: "None" },
    { value: "gradient-dark-vertical", label: "🌓", desc: "Dark ↕" },
    { value: "gradient-light-horizontal", label: "🌞", desc: "Light ↔" },
    { value: "colored", label: "🌈", desc: "Colored" },
    { value: "shades", label: "🎨", desc: "Shades" },
  ];

  const frameOptions: ButtonGridOption[] = [
    { value: "none", label: "⬜", desc: "None" },
    { value: "scan-me", label: "📱", desc: "Scan Me" },
    { value: "speech-bubble", label: "💬", desc: "Speech" },
    { value: "rounded-box", label: "⭕", desc: "Rounded" },
    { value: "border", label: "⬛", desc: "Border" },
  ];

  const blendingOptions: ButtonGridOption[] = [
    { value: "normal", label: "N", desc: "Normal" },
    { value: "multiply", label: "M", desc: "Multiply" },
    { value: "overlay", label: "O", desc: "Overlay" },
    { value: "screen", label: "S", desc: "Screen" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <QRPreview
        config={config}
        logoDataUrl={logoDataUrl}
        pixelMatchImageUrl={pixelMatchImageUrl}
        onDownload={downloadQR}
        onReset={resetConfig}
        onUpdateConfig={updateConfig}
      />

      <div className="card p-8 space-y-8 relative overflow-hidden lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:sticky lg:top-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

        <div className="relative">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            🎨 Customize QR Code
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-16 rounded-full"></div>
        </div>

        {/* Mode warnings */}
        {isPixelMatchMode && (
          <ModeWarning mode="pixel" onDisable={disablePixelMatching} />
        )}
        {!isPixelMatchMode && hasAdvancedStyling && (
          <ModeWarning mode="styling" onDisable={disableAdvancedStyling} />
        )}

        {/* Data Input */}
        <ControlSection title="Data (Text/URL)" icon="📝">
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
        </ControlSection>

        {/* Size Controls */}
        <ControlSection title="Size Settings" icon="📐">
          <div className="grid grid-cols-2 gap-4">
            <RangeControl
              label="Size"
              value={config.size}
              min={200}
              max={800}
              unit="px"
              onChange={(size) => updateConfig({ size })}
            />
            <RangeControl
              label="Margin"
              value={config.margin}
              min={0}
              max={50}
              unit="px"
              onChange={(margin) => updateConfig({ margin })}
            />
          </div>
        </ControlSection>

        {/* Colors */}
        <ControlSection title="Colors" icon="🎨">
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              color={config.dotColor}
              onChange={(dotColor) => updateConfig({ dotColor })}
              label="QR Code Color"
            />
            <ColorPicker
              color={config.backgroundColor}
              onChange={(backgroundColor) => updateConfig({ backgroundColor })}
              label="Background Color"
            />
            <ColorPicker
              color={config.cornerEyeColor}
              onChange={(cornerEyeColor) => updateConfig({ cornerEyeColor })}
              label="Corner Eye Color"
            />
            <ColorPicker
              color={config.cornerEyeInnerColor}
              onChange={(cornerEyeInnerColor) =>
                updateConfig({ cornerEyeInnerColor })
              }
              label="Corner Eye Inner"
            />
          </div>
          <ToggleControl
            id="bg-transparent"
            label="Transparent background"
            checked={config.backgroundTransparent}
            onChange={(backgroundTransparent) =>
              updateConfig({ backgroundTransparent })
            }
          />
        </ControlSection>

        {/* Frame Customization */}
        <ControlSection title="Frame Style" icon="🖼️">
          <ButtonGrid
            options={frameOptions}
            value={config.frameStyle}
            onChange={(frameStyle) =>
              updateConfig({ frameStyle: frameStyle as any })
            }
            columns={5}
          />
          {config.frameStyle !== "none" && config.frameStyle !== "border" && (
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Frame Text
              </label>
              <input
                type="text"
                value={config.frameText}
                onChange={(e) => updateConfig({ frameText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter frame text..."
              />
            </div>
          )}
        </ControlSection>

        {/* Pixel Match Image Upload */}
        <ControlSection title="Pixel Match Image" icon="🎭">
          <div className="space-y-3">
            <button
              onClick={pixelMatchUpload.triggerFileUpload}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 group"
            >
              <Upload
                size={20}
                className="text-purple-400 group-hover:text-purple-500"
              />
              <span className="text-purple-600 group-hover:text-purple-700">
                Upload Image for Pixel Matching
              </span>
            </button>
            <input
              ref={pixelMatchUpload.fileInputRef}
              type="file"
              accept="image/*"
              onChange={pixelMatchUpload.handleFileUpload}
              className="hidden"
            />

            {pixelMatchImageUrl && (
              <div className="relative bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={pixelMatchImageUrl}
                      alt="Pixel match preview"
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <span className="text-sm text-gray-600">
                      Pixel match image uploaded
                    </span>
                  </div>
                  <button
                    onClick={pixelMatchUpload.removeFile}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            {config.pixelMatchEnabled && config.pixelMatchImage && (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <ToggleControl
                  id="pixel-match-enabled"
                  label="Enable Pixel Matching"
                  checked={config.pixelMatchEnabled}
                  onChange={(pixelMatchEnabled) =>
                    updateConfig({ pixelMatchEnabled })
                  }
                />
                <div className="grid grid-cols-1 gap-3">
                  <RangeControl
                    label="Pixel Opacity"
                    value={config.pixelMatchOpacity}
                    min={0.1}
                    max={1}
                    step={0.1}
                    unit="%"
                    onChange={(pixelMatchOpacity) =>
                      updateConfig({ pixelMatchOpacity })
                    }
                  />
                  <RangeControl
                    label="Resolution"
                    value={config.pixelMatchResolution}
                    min={15}
                    max={50}
                    step={5}
                    unit="x"
                    onChange={(pixelMatchResolution) =>
                      updateConfig({ pixelMatchResolution })
                    }
                  />
                </div>

                {/* Blending Mode */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">
                    Blending Mode
                  </label>
                  <ButtonGrid
                    options={blendingOptions}
                    value={config.pixelMatchBlending}
                    onChange={(pixelMatchBlending) =>
                      updateConfig({
                        pixelMatchBlending: pixelMatchBlending as any,
                      })
                    }
                    columns={4}
                  />
                </div>
              </div>
            )}
          </div>
        </ControlSection>

        {!isPixelMatchMode && (
          <ControlSection title="Advanced QR Styling" icon="✨">
            <div className="space-y-4">
              {/* QR Variant */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  QR Body Style
                </label>
                <ButtonGrid
                  options={qrVariantOptions}
                  value={config.qrVariant}
                  onChange={(qrVariant) =>
                    updateConfig({ qrVariant: qrVariant as any })
                  }
                  columns={4}
                />
              </div>

              {/* Eye Variant */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Corner Eye Style
                </label>
                <ButtonGrid
                  options={eyeVariantOptions}
                  value={config.eyeVariant}
                  onChange={(eyeVariant) =>
                    updateConfig({ eyeVariant: eyeVariant as any })
                  }
                  columns={3}
                />
              </div>

              {/* Color Effects */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Color Effects
                </label>
                <ButtonGrid
                  options={colorEffectOptions}
                  value={config.colorEffect}
                  onChange={(colorEffect) =>
                    updateConfig({ colorEffect: colorEffect as any })
                  }
                  columns={3}
                />
              </div>

              <div className="space-y-2">
                <ToggleControl
                  id="divider"
                  label="Add separation between dots"
                  checked={config.divider}
                  onChange={(divider) => updateConfig({ divider })}
                />
                <ToggleControl
                  id="bg-rounded"
                  label="Rounded background"
                  checked={config.bgRounded}
                  onChange={(bgRounded) => updateConfig({ bgRounded })}
                />
              </div>
            </div>
          </ControlSection>
        )}

        {/* Logo Upload */}
        <ControlSection title="Logo (Optional)" icon="📸">
          <div className="space-y-3">
            <button
              onClick={logoUpload.triggerFileUpload}
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
              ref={logoUpload.fileInputRef}
              type="file"
              accept="image/*"
              onChange={logoUpload.handleFileUpload}
              className="hidden"
            />

            {logoDataUrl && (
              <div className="relative bg-gray-50 rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={logoDataUrl}
                      alt="Logo preview"
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <span className="text-sm text-gray-600">Logo uploaded</span>
                  </div>
                  <button
                    onClick={logoUpload.removeFile}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            {logoDataUrl && (
              <div className="space-y-3 pt-3 border-t border-gray-200">
                <RangeControl
                  label="Logo Size"
                  value={config.logoSize}
                  min={0.1}
                  max={0.5}
                  step={0.05}
                  unit="%"
                  onChange={(logoSize) => updateConfig({ logoSize })}
                />
                <RangeControl
                  label="Logo Corner Radius"
                  value={config.logoCornerRadius}
                  min={0}
                  max={20}
                  unit="px"
                  onChange={(logoCornerRadius) =>
                    updateConfig({ logoCornerRadius })
                  }
                />
                <ColorPicker
                  color={config.logoBackgroundColor}
                  onChange={(logoBackgroundColor) =>
                    updateConfig({ logoBackgroundColor })
                  }
                  label="Logo Background Color"
                />
                <ToggleControl
                  id="logo-bg-transparent"
                  label="Transparent logo background"
                  checked={config.logoBackgroundTransparent}
                  onChange={(logoBackgroundTransparent) =>
                    updateConfig({ logoBackgroundTransparent })
                  }
                />
              </div>
            )}
          </div>
        </ControlSection>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
