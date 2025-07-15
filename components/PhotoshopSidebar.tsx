"use client";

import { QRConfig } from "@/lib/types";
import {
  ChevronDown,
  ChevronRight,
  Frame,
  Image,
  Layers,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Square,
  Sun,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFileUpload } from "../hooks/useFileUpload";
import { useQRModes } from "../hooks/useQRModes";
import ColorPicker from "./ColorPicker";
import { useTheme } from "./ThemeProvider";
import ButtonGrid, { ButtonGridOption } from "./ui/ButtonGrid";
import RangeControl from "./ui/RangeControl";
import ToggleControl from "./ui/ToggleControl";

interface PhotoshopSidebarProps {
  config: QRConfig;
  updateConfig: (updates: Partial<QRConfig>) => void;
  resetConfig: () => void;
  logoDataUrl: string | null;
  setLogoDataUrl: (url: string | null) => void;
  pixelMatchImageUrl: string | null;
  setPixelMatchImageUrl: (url: string | null) => void;
}

interface PanelProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Panel = ({ title, icon, children, defaultOpen = true }: PanelProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { isDark } = useTheme();

  return (
    <div
      className={`border-b ${isDark ? "border-gray-700" : "border-gray-300"}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-3 transition-colors ${
          isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            {title}
          </span>
        </div>
        {isOpen ? (
          <ChevronDown
            size={16}
            className={isDark ? "text-gray-400" : "text-gray-600"}
          />
        ) : (
          <ChevronRight
            size={16}
            className={isDark ? "text-gray-400" : "text-gray-600"}
          />
        )}
      </button>
      {isOpen && (
        <div className={`p-3 ${isDark ? "bg-gray-800/50" : "bg-gray-50"}`}>
          {children}
        </div>
      )}
    </div>
  );
};

const PhotoshopSidebar = ({
  config,
  updateConfig,
  resetConfig,
  logoDataUrl,
  setLogoDataUrl,
  pixelMatchImageUrl,
  setPixelMatchImageUrl,
}: PhotoshopSidebarProps) => {
  const { isDark, toggleTheme } = useTheme();

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

  // Button grid options with better layout
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

  const sidebarBg = isDark ? "bg-gray-900" : "bg-white";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const subtitleColor = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-80 ${sidebarBg} border-l ${borderColor} z-50 overflow-y-auto scrollbar-thin ${
        isDark
          ? "scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          : "scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      }`}
    >
      {/* Header */}
      <div className={`border-b ${borderColor} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings size={20} className="text-blue-400" />
            <h2 className={`text-lg font-semibold ${textColor}`}>
              QR Customizer
            </h2>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
            title={`Switch to ${isDark ? "light" : "dark"} theme`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <p className={`text-xs ${subtitleColor} mt-1`}>
          Professional QR Code Designer
        </p>
      </div>

      {/* Mode warnings */}
      {isPixelMatchMode && (
        <div
          className={`${
            isDark
              ? "bg-purple-900/30 border-purple-700/50"
              : "bg-purple-50 border-purple-200"
          } border-b p-3`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers size={14} className="text-purple-400" />
              <span
                className={`text-xs ${
                  isDark ? "text-purple-200" : "text-purple-700"
                }`}
              >
                Pixel Match Active
              </span>
            </div>
            <button
              onClick={disablePixelMatching}
              className={`text-xs ${
                isDark
                  ? "text-purple-300 hover:text-purple-100"
                  : "text-purple-600 hover:text-purple-800"
              }`}
            >
              Disable
            </button>
          </div>
        </div>
      )}

      {/* Panels */}
      <div
        className={`divide-y ${isDark ? "divide-gray-700" : "divide-gray-200"}`}
      >
        {/* Data Input Panel */}
        <Panel
          title="Content"
          icon={<Settings size={16} className="text-blue-400" />}
        >
          <div className="space-y-3">
            <div>
              <label
                className={`block text-xs font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Data (Text/URL)
              </label>
              <textarea
                value={config.data}
                onChange={(e) => updateConfig({ data: e.target.value })}
                className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark
                    ? "bg-gray-800 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
                rows={3}
                placeholder="Enter your text, URL, or data..."
              />
              <div
                className={`text-xs ${
                  isDark ? "text-gray-500" : "text-gray-400"
                } mt-1`}
              >
                {config.data.length} characters
              </div>
            </div>
          </div>
        </Panel>

        {/* Size Settings Panel */}
        <Panel
          title="Transform"
          icon={<Square size={16} className="text-green-400" />}
        >
          <div className="space-y-4">
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
        </Panel>

        {/* Colors Panel */}
        <Panel
          title="Colors"
          icon={<Palette size={16} className="text-pink-400" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <ColorPicker
                color={config.dotColor}
                onChange={(dotColor) => updateConfig({ dotColor })}
                label="QR Code"
              />
              <ColorPicker
                color={config.backgroundColor}
                onChange={(backgroundColor) =>
                  updateConfig({ backgroundColor })
                }
                label="Background"
              />
              <ColorPicker
                color={config.cornerEyeColor}
                onChange={(cornerEyeColor) => updateConfig({ cornerEyeColor })}
                label="Corner Eyes"
              />
              <ColorPicker
                color={config.cornerEyeInnerColor}
                onChange={(cornerEyeInnerColor) =>
                  updateConfig({ cornerEyeInnerColor })
                }
                label="Eye Inner"
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
          </div>
        </Panel>

        {/* Frame Panel */}
        <Panel
          title="Frame"
          icon={<Frame size={16} className="text-orange-400" />}
        >
          <div className="space-y-3">
            <div>
              <label
                className={`block text-xs font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                Frame Style
              </label>
              <ButtonGrid
                options={frameOptions}
                value={config.frameStyle}
                onChange={(frameStyle) =>
                  updateConfig({ frameStyle: frameStyle as any })
                }
                columns={5}
              />
            </div>
            {config.frameStyle !== "none" && config.frameStyle !== "border" && (
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Frame Text
                </label>
                <input
                  type="text"
                  value={config.frameText}
                  onChange={(e) => updateConfig({ frameText: e.target.value })}
                  className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? "bg-gray-800 border-gray-600 text-gray-200"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder="Enter frame text..."
                />
              </div>
            )}
          </div>
        </Panel>

        {/* Advanced Styling Panel */}
        {!isPixelMatchMode && (
          <Panel
            title="Effects"
            icon={<Sparkles size={16} className="text-yellow-400" />}
          >
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
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

              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
                  Corner Eyes
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

              <div>
                <label
                  className={`block text-xs font-medium ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  } mb-2`}
                >
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
                  label="Dot separation"
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
          </Panel>
        )}

        {/* Logo Panel */}
        <Panel
          title="Logo"
          icon={<Image size={16} className="text-purple-400" />}
        >
          <div className="space-y-3">
            <button
              onClick={logoUpload.triggerFileUpload}
              className={`w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed rounded transition-all duration-300 group ${
                isDark
                  ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <Upload
                size={16}
                className={`${
                  isDark
                    ? "text-gray-400 group-hover:text-gray-300"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span
                className={`text-sm ${
                  isDark
                    ? "text-gray-400 group-hover:text-gray-300"
                    : "text-gray-600 group-hover:text-gray-800"
                }`}
              >
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
              <div
                className={`${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                } rounded p-3`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={logoDataUrl}
                      alt="Logo preview"
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Logo uploaded
                    </span>
                  </div>
                  <button
                    onClick={logoUpload.removeFile}
                    className={`${
                      isDark
                        ? "text-gray-400 hover:text-red-400"
                        : "text-gray-500 hover:text-red-500"
                    } transition-colors`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {logoDataUrl && (
              <div
                className={`space-y-3 pt-3 border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
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
                  label="Corner Radius"
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
                  label="Logo Background"
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
        </Panel>

        {/* Pixel Match Panel */}
        <Panel
          title="Pixel Match"
          icon={<Layers size={16} className="text-cyan-400" />}
        >
          <div className="space-y-3">
            <button
              onClick={pixelMatchUpload.triggerFileUpload}
              className={`w-full flex items-center justify-center space-x-2 px-3 py-2 border-2 border-dashed rounded transition-all duration-300 group ${
                isDark
                  ? "border-gray-600 hover:border-gray-500 hover:bg-gray-800"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
              }`}
            >
              <Upload
                size={16}
                className={`${
                  isDark
                    ? "text-gray-400 group-hover:text-gray-300"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span
                className={`text-sm ${
                  isDark
                    ? "text-gray-400 group-hover:text-gray-300"
                    : "text-gray-600 group-hover:text-gray-800"
                }`}
              >
                Upload Image
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
              <div
                className={`${
                  isDark ? "bg-gray-800" : "bg-gray-100"
                } rounded p-3`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={pixelMatchImageUrl}
                      alt="Pixel match preview"
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span
                      className={`text-xs ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Image uploaded
                    </span>
                  </div>
                  <button
                    onClick={pixelMatchUpload.removeFile}
                    className={`${
                      isDark
                        ? "text-gray-400 hover:text-red-400"
                        : "text-gray-500 hover:text-red-500"
                    } transition-colors`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {config.pixelMatchEnabled && config.pixelMatchImage && (
              <div
                className={`space-y-3 pt-3 border-t ${
                  isDark ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <ToggleControl
                  id="pixel-match-enabled"
                  label="Enable Pixel Matching"
                  checked={config.pixelMatchEnabled}
                  onChange={(pixelMatchEnabled) =>
                    updateConfig({ pixelMatchEnabled })
                  }
                />
                <RangeControl
                  label="Opacity"
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

                <div>
                  <label
                    className={`block text-xs font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } mb-2`}
                  >
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
        </Panel>
      </div>

      {/* Footer Actions */}
      <div className={`border-t ${borderColor} p-4`}>
        <button
          onClick={resetConfig}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
};

export default PhotoshopSidebar;
