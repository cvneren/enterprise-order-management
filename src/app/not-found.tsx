import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center p-8 text-center h-full">
      <div className="w-20 h-20 bg-primary-container/20 rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="w-10 h-10 text-primary" />
      </div>
      <h2 className="font-heading text-4xl font-semibold text-on-surface mb-3 tracking-tight">
        404 - Page Not Found
      </h2>
      <p className="text-on-surface-variant max-w-md mx-auto mb-8 font-sans text-lg">
        The route or resource you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="flex items-center justify-center px-6 py-3 bg-primary text-on-primary font-medium rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Return to Dashboard
      </Link>
    </div>
  );
}
