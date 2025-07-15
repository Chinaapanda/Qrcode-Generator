interface ButtonGridOption {
  value: string;
  label: string;
  desc?: string;
}

interface ButtonGridProps {
  options: ButtonGridOption[];
  value: string;
  onChange: (value: string) => void;
  columns?: number;
}

const ButtonGrid = ({
  options,
  value,
  onChange,
  columns = 4,
}: ButtonGridProps) => (
  <div className={`grid grid-cols-${columns} gap-2`}>
    {options.map((option) => (
      <button
        key={option.value}
        className={`w-full h-12 flex flex-col items-center justify-center rounded-lg border text-xs transition-all duration-200 ${
          value === option.value
            ? "bg-blue-500 border-blue-600 shadow text-white"
            : "bg-white border-gray-300 hover:bg-blue-50 text-gray-700"
        }`}
        onClick={() => onChange(option.value)}
        type="button"
        title={option.desc || option.label}
      >
        <span className="text-lg">{option.label}</span>
        {option.desc && <span className="text-xs mt-1">{option.desc}</span>}
      </button>
    ))}
  </div>
);

export default ButtonGrid;
export type { ButtonGridOption };
