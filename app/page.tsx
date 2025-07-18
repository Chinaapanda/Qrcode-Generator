"use client";

import QRCodeGenerator from "@/components/QRCodeGenerator";
import { QRConfig } from "@/lib/types";
import { useEffect, useState } from "react";

const defaultConfig: QRConfig = {
  data: "https://example.com",
  size: 300,
  margin: 10,
  dotColor: "#000000",
  backgroundColor: "#ffffff",
  backgroundTransparent: false,
  cornerEyeColor: "#000000",
  cornerEyeInnerColor: "#000000",
  cornerEyeStyle: "square",
  dotShape: "square",
  logo: null,
  logoSize: 0.3,
  logoMargin: 10,
  logoCornerRadius: 8,
  logoBackgroundColor: "#ffffff",
  logoBackgroundTransparent: false,
  // QR Styling defaults
  qrVariant: "standard",
  eyeVariant: "standard",
  colorEffect: "none",
  divider: false,
  bgRounded: false,
  // Frame feature
  frameStyle: "scan-me",
  frameText: "SCAN ME",
  // Pixel matching defaults
  pixelMatchEnabled: false,
  pixelMatchImage: null,
  pixelMatchOpacity: 0.8,
  pixelMatchBlending: "normal",
  pixelMatchResolution: 25,
};

export default function Home() {
  const [config, setConfig] = useState<QRConfig>(defaultConfig);

  // Load saved config from localStorage on component mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("qr-config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsed });
      } catch (e) {
        console.error("Error parsing saved config:", e);
      }
    }
  }, []);

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("qr-config", JSON.stringify(config));
  }, [config]);

  const updateConfig = (updates: Partial<QRConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetConfig = () => {
    setConfig(defaultConfig);
    localStorage.removeItem("qr-config");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-950 text-foreground">
      {/* Floating background elements - optimized and theme-aware */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 h-64 bg-gradient-to-r from-purple-400/30 to-pink-400/30 dark:from-purple-600/20 dark:to-pink-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 dark:from-blue-600/20 dark:to-indigo-600/20 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
        <header className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-4 md:mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-gradient">
                QR Code Generator
              </h1>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 rounded-full mx-auto w-24 sm:w-32 animate-pulse-slow"></div>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Create stunning, professional QR codes with advanced customization
            options.
            <span className="font-semibold text-primary">
              {" "}
              No limits, no watermarks, completely free.
            </span>
          </p>

          {/* Feature badges - Responsive layout */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 sm:gap-3 mt-6 md:mt-8 max-w-lg mx-auto">
            {[
              "🎨 Custom Colors",
              "📱 Mobile Ready",
              "💾 Auto Save",
              "📊 High Quality",
            ].map((feature, index) => (
              <span
                key={feature}
                className="px-3 sm:px-4 py-2 bg-card/60 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium text-card-foreground border border-border shadow-sm hover:shadow-md hover:bg-card/80 transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {feature}
              </span>
            ))}
          </div>
        </header>

        <QRCodeGenerator
          config={config}
          updateConfig={updateConfig}
          resetConfig={resetConfig}
        />
      </div>
    </div>
  );
}
