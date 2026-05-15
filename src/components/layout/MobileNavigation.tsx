"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Menu 
} from "lucide-react";
import { clsx } from "clsx";
import { useUIStore } from "@/store/useUIStore";

const navigation = [
  { name: "Dash", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Stock", href: "/inventory", icon: Package },
  { name: "Clients", href: "/customers", icon: Users },
];

export function MobileNavigation() {
  const pathname = usePathname();
  const toggleDrawer = useUIStore((state) => state.toggleDrawer);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-40 px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors",
                isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <item.icon className={clsx("w-5 h-5 mb-1", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                {item.name}
              </span>
            </Link>
          );
        })}
        
        <button
          onClick={toggleDrawer}
          className="flex flex-col items-center justify-center flex-1 h-full py-1 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <Menu className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Menu</span>
        </button>
      </div>
    </nav>
  );
}
