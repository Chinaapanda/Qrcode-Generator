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
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating background elements - optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-64 h-64 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <header className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <h1 className="text-6xl font-bold mb-4 animate-gradient">
                QR Code Generator
              </h1>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full mx-auto w-32 animate-pulse-slow"></div>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Create stunning, professional QR codes with advanced customization
            options.
            <span className="font-semibold text-blue-600">
              {" "}
              No limits, no watermarks, completely free.
            </span>
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              "🎨 Custom Colors",
              "📱 Mobile Ready",
              "💾 Auto Save",
              "📊 High Quality",
            ].map((feature, index) => (
              <span
                key={feature}
                className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-white/20 shadow-sm hover:shadow-md transition-all duration-300"
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
