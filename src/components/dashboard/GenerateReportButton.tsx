"use client";

import { useState } from "react";
import { simulatedFetch } from "@/lib/mockApi";
import { Download, Loader2, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

export function GenerateReportButton() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerate = async () => {
    setStatus("loading");
    setErrorMessage("");

    try {
      // Simulate an async report generation (default 30% failure rate)
      await simulatedFetch({ success: true });
      setStatus("success");

      // Reset success state after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error: unknown) {
      setStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Failed to generate report.");
      }
    }
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleGenerate}
        disabled={status === "loading" || status === "success"}
        className={clsx(
          "flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium transition-all min-w-[220px] font-sans shadow-sm",
          status === "idle" && "bg-primary text-on-primary hover:bg-primary/90",
          status === "loading" && "bg-surface-variant text-on-surface-variant cursor-not-allowed",
          status === "success" && "bg-[#d1e9d1] text-[#0d1f11]", // tertiary-fixed
          status === "error" && "bg-error text-on-error hover:bg-error/90"
        )}
      >
        {status === "idle" && (
          <>
            <Download className="w-4 h-4 mr-2" />
            Generate Revenue Report
          </>
        )}
        {status === "loading" && (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Report...
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Report Ready
          </>
        )}
        {status === "error" && (
          <>
            <Download className="w-4 h-4 mr-2" />
            Retry Generation
          </>
        )}
      </button>

      {status === "error" && (
        <span className="text-xs text-error mt-2 font-medium font-sans">{errorMessage}</span>
      )}
    </div>
  );
}
