import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QR Code Generator",
  description: "Create beautiful, customizable QR codes with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider defaultTheme="system" storageKey="qr-generator-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
