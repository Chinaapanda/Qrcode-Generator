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
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded text-primary focus:ring-primary border-border bg-background focus:ring-offset-background"
      />
      <label htmlFor={id} className="text-sm text-foreground">
        {label}
      </label>
    </div>
  );
};

export default ToggleControl;
