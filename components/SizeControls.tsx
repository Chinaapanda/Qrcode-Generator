interface SizeControlsProps {
  size: number;
  margin: number;
  onSizeChange: (size: number) => void;
  onMarginChange: (margin: number) => void;
}

const SizeControls = ({
  size,
  margin,
  onSizeChange,
  onMarginChange,
}: SizeControlsProps) => {
  return (
    <>
      {/* Size */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-800">📏 Size</label>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {size}px
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="200"
            max="500"
            value={size}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
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
            {margin}px
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="50"
            value={margin}
            onChange={(e) => onMarginChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </>
  );
};

export default SizeControls;
