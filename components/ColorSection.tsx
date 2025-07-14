import ColorPicker from "./ColorPicker";

interface ColorSectionProps {
  dotColor: string;
  cornerEyeColor: string;
  cornerEyeInnerColor: string;
  onDotColorChange: (color: string) => void;
  onCornerEyeColorChange: (color: string) => void;
  onCornerEyeInnerColorChange: (color: string) => void;
}

const ColorSection = ({
  dotColor,
  cornerEyeColor,
  cornerEyeInnerColor,
  onDotColorChange,
  onCornerEyeColorChange,
  onCornerEyeInnerColorChange,
}: ColorSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <span>🌈</span>
          <span>Colors</span>
        </h3>
        <div className="space-y-4">
          <ColorPicker
            color={dotColor}
            onChange={onDotColorChange}
            label="Dot Color"
          />

          <ColorPicker
            color={cornerEyeColor}
            onChange={onCornerEyeColorChange}
            label="Corner Eye Color"
          />

          <ColorPicker
            color={cornerEyeInnerColor}
            onChange={onCornerEyeInnerColorChange}
            label="Corner Eye Inner Color"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorSection;
