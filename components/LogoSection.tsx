import { Upload } from "lucide-react";
import { useRef } from "react";

interface LogoSectionProps {
  logoDataUrl: string | null;
  logoSize: number;
  logoMargin: number;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoRemove: () => void;
  onLogoSizeChange: (size: number) => void;
  onLogoMarginChange: (margin: number) => void;
}

const LogoSection = ({
  logoDataUrl,
  logoSize,
  logoMargin,
  onLogoUpload,
  onLogoRemove,
  onLogoSizeChange,
  onLogoMarginChange,
}: LogoSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
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
            onChange={onLogoUpload}
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
                  onClick={onLogoRemove}
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
                {Math.round(logoSize * 100)}%
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0.1"
                max="0.5"
                step="0.05"
                value={logoSize}
                onChange={(e) => onLogoSizeChange(parseFloat(e.target.value))}
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
                {logoMargin}px
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="20"
                value={logoMargin}
                onChange={(e) => onLogoMarginChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LogoSection;
