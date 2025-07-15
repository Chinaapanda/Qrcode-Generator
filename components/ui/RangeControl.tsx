import { useTheme } from "../ThemeProvider";

interface RangeControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

const RangeControl = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: RangeControlProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div>
      <label
        className={`block text-xs font-medium mb-1 ${
          isDark ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {label}: {step < 1 ? (value * 100).toFixed(0) : value}
        {unit}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) =>
          onChange(
            step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value)
          )
        }
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${
          isDark ? "bg-gray-700" : "bg-gray-200"
        }`}
      />
    </div>
  );
};

export default RangeControl;
