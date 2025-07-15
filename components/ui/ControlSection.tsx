interface ControlSectionProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

const ControlSection = ({ title, icon, children }: ControlSectionProps) => (
  <div className="space-y-4">
    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
      <span>{icon}</span>
      <span>{title}</span>
    </h3>
    {children}
  </div>
);

export default ControlSection;
