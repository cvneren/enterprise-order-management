"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, Coffee } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] flex-shrink-0 bg-primary text-on-primary h-screen sticky top-0 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-primary-container/50">
        <Coffee className="w-6 h-6 mr-3 text-secondary-container" />
        <span className="font-heading font-semibold text-lg tracking-tight">Espresso Logic</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-primary-container text-on-primary font-semibold"
                  : "text-on-primary-container hover:bg-primary-container/50 hover:text-on-primary"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                  isActive
                    ? "text-on-primary"
                    : "text-on-primary-container group-hover:text-on-primary"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-primary-container/50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-heading font-bold text-sm">
            JD
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-on-primary">Jane Doe</p>
            <p className="text-xs text-on-primary-container">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
