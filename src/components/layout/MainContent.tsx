import React from "react";

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden h-screen overflow-y-auto">
      <div className="px-4 py-4 md:px-8 md:py-6 pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </main>
  );
}
