import ColorPicker from "./ColorPicker";

interface BackgroundSectionProps {
  backgroundColor: string;
  backgroundTransparent: boolean;
  onBackgroundColorChange: (color: string) => void;
  onBackgroundTransparentChange: (transparent: boolean) => void;
}

const BackgroundSection = ({
  backgroundColor,
  backgroundTransparent,
  onBackgroundColorChange,
  onBackgroundTransparentChange,
}: BackgroundSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
        <span>🖼️</span>
        <span>Background</span>
      </h3>
      <div className="p-4 bg-gray-50/50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300">
        <div className="flex items-center space-x-3 mb-3">
          <input
            type="checkbox"
            checked={backgroundTransparent}
            onChange={(e) => onBackgroundTransparentChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label className="text-sm font-semibold text-gray-800">
            Transparent Background
          </label>
        </div>
        {!backgroundTransparent && (
          <ColorPicker
            color={backgroundColor}
            onChange={onBackgroundColorChange}
            label="Background Color"
          />
        )}
      </div>
    </div>
  );
};

export default BackgroundSection;
