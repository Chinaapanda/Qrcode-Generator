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
}: RangeControlProps) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1">
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
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
    />
  </div>
);

export default RangeControl;
