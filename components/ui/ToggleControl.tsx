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
}: ToggleControlProps) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label htmlFor={id} className="text-sm text-gray-700">
      {label}
    </label>
  </div>
);

export default ToggleControl;
