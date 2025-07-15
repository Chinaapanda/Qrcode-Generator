import { ColorPickerProps } from "@/lib/types";
import { useTheme } from "./ThemeProvider";

const ColorPicker = ({ color, onChange, label }: ColorPickerProps) => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-2">
      <label
        className={`text-sm font-semibold flex items-center space-x-2 ${
          isDark ? "text-gray-200" : "text-gray-800"
        }`}
      >
        <span>🎨</span>
        <span>{label}</span>
      </label>
      <div
        className={`flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 group ${
          isDark
            ? "bg-gray-800/50 border-gray-600 hover:bg-gray-700"
            : "bg-gray-50/50 border-gray-200 hover:bg-white"
        }`}
      >
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
          <span
            className={`text-sm font-medium ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
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
