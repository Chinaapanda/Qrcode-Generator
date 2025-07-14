import { QRConfig } from "@/lib/types";
import Select from "./Select";

interface ShapeSectionProps {
  dotShape: QRConfig["dotShape"];
  cornerEyeStyle: QRConfig["cornerEyeStyle"];
  onDotShapeChange: (shape: QRConfig["dotShape"]) => void;
  onCornerEyeStyleChange: (style: QRConfig["cornerEyeStyle"]) => void;
}

const ShapeSection = ({
  dotShape,
  cornerEyeStyle,
  onDotShapeChange,
  onCornerEyeStyleChange,
}: ShapeSectionProps) => {
  const dotShapeOptions = [
    { value: "square", label: "Square" },
    { value: "dots", label: "Dots" },
    { value: "rounded", label: "Rounded" },
    { value: "extra-rounded", label: "Extra Rounded" },
  ];

  const cornerEyeStyleOptions = [
    { value: "square", label: "Square" },
    { value: "dot", label: "Dot" },
    { value: "extra-rounded", label: "Extra Rounded" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
          <span>⭐</span>
          <span>Shapes</span>
        </h3>
        <div className="space-y-4">
          <Select
            value={dotShape}
            onChange={(value) =>
              onDotShapeChange(value as QRConfig["dotShape"])
            }
            options={dotShapeOptions}
            label="Dot Shape"
          />

          <Select
            value={cornerEyeStyle}
            onChange={(value) =>
              onCornerEyeStyleChange(value as QRConfig["cornerEyeStyle"])
            }
            options={cornerEyeStyleOptions}
            label="Corner Eye Style"
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeSection;
