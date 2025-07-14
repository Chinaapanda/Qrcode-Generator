import { ColorPickerProps } from "@/lib/types";

const ColorPicker = ({ color, onChange, label }: ColorPickerProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-800 flex items-center space-x-2">
        <span>🎨</span>
        <span>{label}</span>
      </label>
      <div className="flex items-center space-x-3 p-3 bg-gray-50/50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 group">
        <div className="relative">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="color-picker group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 rounded-lg ring-2 ring-white shadow-lg pointer-events-none"></div>
        </div>
        <div className="flex-1">
          <span className="text-sm text-gray-600 font-medium">
            {color.toUpperCase()}
          </span>
          <div
            className="h-1 bg-gradient-to-r rounded-full mt-1"
            style={{
              backgroundImage: `linear-gradient(to right, ${color}, ${color})`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
