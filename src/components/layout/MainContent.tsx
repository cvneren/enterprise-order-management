import React from "react";

export default function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden h-screen overflow-y-auto">
      <div className="px-6 py-6 md:px-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </main>
  );
}
