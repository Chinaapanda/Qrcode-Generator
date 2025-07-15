"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
    />
  </svg>
);

const SystemIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
    />
  </svg>
);

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border border-border bg-background animate-pulse" />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    switch (theme) {
      case "light":
        return <SunIcon />;
      case "dark":
        return <MoonIcon />;
      case "system":
        return <SystemIcon />;
      default:
        return <SystemIcon />;
    }
  };

  const getTooltip = () => {
    switch (theme) {
      case "light":
        return "Switch to dark mode";
      case "dark":
        return "Switch to system mode";
      case "system":
        return "Switch to light mode";
      default:
        return "Switch theme";
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="
        relative flex items-center justify-center
        w-10 h-10 rounded-lg
        border border-border bg-background
        hover:bg-accent hover:border-accent-foreground/20
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        group
      "
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      <div className="text-foreground transition-transform duration-200 group-hover:scale-110">
        {getIcon()}
      </div>

      {/* Theme indicator */}
      <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-background">
        {theme === "light" && (
          <div className="w-full h-full bg-yellow-500 rounded-full" />
        )}
        {theme === "dark" && (
          <div className="w-full h-full bg-blue-600 rounded-full" />
        )}
        {theme === "system" && (
          <div className="w-full h-full bg-gray-500 rounded-full" />
        )}
      </div>
    </button>
  );
}
