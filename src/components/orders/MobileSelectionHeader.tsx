"use client";

import React from "react";
import { useOrderStore } from "@/store/useStore";
import { useToastStore } from "@/store/useToastStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, PackageX, Printer } from "lucide-react";

export function MobileSelectionHeader() {
  const selectedOrderIds = useOrderStore((state) => state.selectedOrderIds);
  const clearSelection = useOrderStore((state) => state.clearSelection);
  const showToast = useToastStore((state) => state.showToast);

  const handleAction = (actionName: string) => {
    const count = selectedOrderIds.length;
    showToast(`Successfully ${actionName} ${count} order${count > 1 ? "s" : ""}.`);
    clearSelection();
  };

  return (
    <AnimatePresence>
      {selectedOrderIds.length > 0 && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="md:hidden fixed top-0 left-0 right-0 z-[100] bg-primary text-on-primary px-4 py-3 shadow-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <button 
              onClick={clearSelection}
              className="p-3 -ml-2 hover:bg-on-primary/10 rounded-full transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm">
              {selectedOrderIds.length} Selected
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleAction("marked shipped")}
              className="p-3 hover:bg-on-primary/10 rounded-md transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Mark Shipped"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleAction("printed labels for")}
              className="p-3 hover:bg-on-primary/10 rounded-md transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Print Labels"
            >
              <Printer className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleAction("canceled")}
              className="p-3 hover:bg-error/20 text-[#ffdad6] rounded-md transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Cancel Orders"
            >
              <PackageX className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
