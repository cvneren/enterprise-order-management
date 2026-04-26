import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import MainContent from "@/components/layout/MainContent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Coffee Wholesale Order Dashboard",
  description: "B2B wholesale coffee operations dashboard",
};

import { Toast } from "@/components/ui/Toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${workSans.variable}`}>
      <body className="font-sans antialiased bg-background text-on-surface flex min-h-screen">
        <Toast />
        <Sidebar />
        <MainContent>{children}</MainContent>
      </body>
    </html>
  );
}
