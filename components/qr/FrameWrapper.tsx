interface FrameWrapperProps {
  children: React.ReactNode;
  frameStyle: string;
  frameText: string;
}

const FrameWrapper = ({
  children,
  frameStyle,
  frameText,
}: FrameWrapperProps) => {
  if (frameStyle === "none") {
    return (
      <div className="relative p-4 rounded-2xl bg-white shadow-inner">
        {children}
      </div>
    );
  }

  const frameConfigs = {
    "scan-me": {
      wrapper:
        "relative p-4 border-4 border-black rounded-2xl bg-white shadow-inner",
      label:
        "mt-2 px-4 py-2 bg-black text-white rounded-b-xl font-bold text-lg shadow-lg relative -top-2",
    },
    "speech-bubble": {
      wrapper:
        "relative p-4 border-4 border-blue-400 rounded-2xl bg-white shadow-inner",
      label: "relative mt-2",
    },
    "rounded-box": {
      wrapper:
        "relative p-4 border-4 border-purple-400 rounded-2xl bg-white shadow-inner",
      label:
        "mt-2 px-4 py-2 bg-purple-400 text-white rounded-xl font-bold text-lg shadow-lg",
    },
    border: {
      wrapper:
        "relative p-4 border-4 border-gray-400 rounded-2xl bg-white shadow-inner",
      label: "",
    },
  };

  const config = frameConfigs[frameStyle as keyof typeof frameConfigs];

  return (
    <>
      <div className={config.wrapper}>{children}</div>
      {frameStyle === "speech-bubble" ? (
        <div className="relative mt-2">
          <div className="inline-block px-4 py-2 bg-blue-400 text-white rounded-full font-bold text-lg shadow-lg relative">
            {frameText || "SCAN ME"}
          </div>
          <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-blue-400 rotate-45 -translate-x-1/2"></div>
        </div>
      ) : frameStyle !== "border" && frameStyle !== "none" ? (
        <div className={config.label}>{frameText || "SCAN ME"}</div>
      ) : null}
    </>
  );
};

export default FrameWrapper;
