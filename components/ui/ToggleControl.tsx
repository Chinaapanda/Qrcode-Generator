import { useTheme } from "../ThemeProvider";

interface ToggleControlProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleControl = ({
  id,
  label,
  checked,
  onChange,
}: ToggleControlProps) => {
  const { isDark } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`rounded text-blue-500 focus:ring-blue-500 ${
          isDark
            ? "border-gray-600 bg-gray-700 focus:ring-offset-gray-800"
            : "border-gray-300 bg-white focus:ring-offset-white"
        }`}
      />
      <label
        htmlFor={id}
        className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}
      >
        {label}
      </label>
    </div>
  );
};

export default ToggleControl;
