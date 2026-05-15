"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, 
  Settings, 
  LogOut, 
  User, 
  HelpCircle,
  Coffee
} from "lucide-react";
import { clsx } from "clsx";
import { useUIStore } from "@/store/useUIStore";

export function MobileDrawer() {
  const pathname = usePathname();
  const isDrawerOpen = useUIStore((state) => state.isDrawerOpen);
  const closeDrawer = useUIStore((state) => state.closeDrawer);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={clsx(
          "md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-[50] transition-opacity duration-300",
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <aside
        className={clsx(
          "md:hidden fixed top-0 right-0 bottom-0 w-[280px] bg-surface shadow-2xl z-[60] transition-transform duration-300 ease-in-out flex flex-col",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
          <div className="flex items-center">
            <Coffee className="w-5 h-5 mr-2 text-primary" />
            <span className="font-heading font-bold text-on-surface">Menu</span>
          </div>
          <button 
            onClick={closeDrawer}
            className="p-2 -mr-2 text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          <div className="mb-8">
            <div className="px-3 mb-3 text-[10px] font-bold text-[#71716E] uppercase tracking-widest">
              Account
            </div>
            <div className="flex items-center px-3 py-3 bg-surface-variant/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-heading font-bold">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-on-surface">Jane Doe</p>
                <p className="text-xs text-on-surface-variant">Administrator</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <div className="px-3 mb-3 text-[10px] font-bold text-[#71716E] uppercase tracking-widest">
              System
            </div>
            <Link
              href="/settings"
              onClick={closeDrawer}
              className={clsx(
                "flex items-center px-3 py-3 text-sm font-bold rounded-md transition-colors",
                pathname === "/settings" 
                  ? "bg-primary-container text-on-primary" 
                  : "text-on-surface-variant hover:bg-surface-variant/50"
              )}
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
            <button
              className="w-full flex items-center px-3 py-3 text-sm font-bold text-on-surface-variant rounded-md hover:bg-surface-variant/50 transition-colors"
            >
              <User className="w-5 h-5 mr-3" />
              Profile
            </button>
            <button
              className="w-full flex items-center px-3 py-3 text-sm font-bold text-on-surface-variant rounded-md hover:bg-surface-variant/50 transition-colors"
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Support
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center justify-center px-4 py-3 bg-error/10 text-error font-bold rounded-md hover:bg-error/20 transition-colors">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
