"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error:", error);
  }, [error]);

  return (
    <html lang="en" className={`${inter.variable} ${workSans.variable}`}>
      <body className="font-sans antialiased bg-background text-on-surface flex min-h-screen items-center justify-center p-8">
        <div className="max-w-md w-full flex flex-col items-center text-center p-8 bg-surface border border-border rounded-lg shadow-sm">
          <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-on-error-container" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-on-surface mb-2">
            Critical System Error
          </h1>
          <p className="text-on-surface-variant mb-8 font-sans">
            A critical error occurred while rendering the application shell.
          </p>
          <button
            onClick={() => reset()}
            className="flex items-center justify-center w-full px-4 py-2 bg-primary text-on-primary font-medium rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
