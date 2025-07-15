export interface ButtonGridOption {
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
}: ButtonGridProps) => {
  // Create proper grid class mapping
  const getGridCols = (cols: number) => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      default:
        return "grid-cols-3";
    }
  };

  return (
    <div className={`grid ${getGridCols(columns)} gap-2`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`w-full h-12 flex flex-col items-center justify-center rounded-lg border text-xs transition-all duration-200 ${
            value === option.value
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-background border-border hover:bg-accent text-foreground hover:border-accent-foreground/20"
          }`}
          onClick={() => onChange(option.value)}
          type="button"
          title={option.desc || option.label}
        >
          <span className="text-lg leading-none">{option.label}</span>
          {option.desc && (
            <span className="text-xs mt-1 leading-none truncate w-full text-center">
              {option.desc}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;
