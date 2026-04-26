import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 h-full w-full">
      <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
      <p className="text-on-surface-variant font-medium animate-pulse">Loading data...</p>
    </div>
  );
}
