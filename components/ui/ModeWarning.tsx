import { Info } from "lucide-react";

interface ModeWarningProps {
  mode: "pixel" | "styling";
  onDisable: () => void;
}

const ModeWarning = ({ mode, onDisable }: ModeWarningProps) => {
  const configs = {
    pixel: {
      title: "Pixel Matching Active",
      description:
        "Advanced QR styling is disabled while using pixel matching.",
      color: "purple",
    },
    styling: {
      title: "Advanced Styling Active",
      description:
        "Some basic controls are overridden by advanced styling options.",
      color: "blue",
    },
  };

  const config = configs[mode];
  const colorClasses = {
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
  };

  return (
    <div
      className={`p-3 border rounded-lg ${
        colorClasses[config.color as keyof typeof colorClasses]
      }`}
    >
      <div className="flex items-start space-x-2">
        <Info size={16} className="mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-sm">{config.title}</h4>
          <p className="text-xs mt-1">{config.description}</p>
        </div>
        <button
          onClick={onDisable}
          className="text-xs underline hover:no-underline"
        >
          Disable
        </button>
      </div>
    </div>
  );
};

export default ModeWarning;
