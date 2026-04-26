"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-surface border border-border rounded-lg text-center">
      <div className="w-16 h-16 bg-error-container rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-on-error-container" />
      </div>
      <h2 className="font-heading text-2xl font-semibold text-on-surface mb-2">
        Something went wrong!
      </h2>
      <p className="text-on-surface-variant max-w-md mx-auto mb-8 font-sans">
        {error.message ||
          "An unexpected error occurred while loading this section. Please try again."}
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center justify-center px-4 py-2 bg-primary text-on-primary font-medium rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Try again
      </button>
    </div>
  );
}
