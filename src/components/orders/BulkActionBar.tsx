"use client";

import { useOrderStore } from "@/store/useStore";
import { useToastStore } from "@/store/useToastStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, PackageX, Printer } from "lucide-react";

export function BulkActionBar() {
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
          initial={{ y: 100, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          exit={{ y: 100, opacity: 0, x: "-50%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-8 left-1/2 z-50 flex items-center bg-primary text-on-primary px-6 py-4 rounded-xl shadow-2xl border border-primary-container gap-6"
        >
          <div className="flex items-center gap-3 border-r border-on-primary/20 pr-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
              {selectedOrderIds.length}
            </span>
            <span className="font-sans font-medium text-sm tracking-tight">Orders Selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction("marked shipped")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-on-primary/10 text-sm font-medium transition-colors font-sans"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Shipped
            </button>
            <button
              onClick={() => handleAction("printed labels for")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-on-primary/10 text-sm font-medium transition-colors font-sans"
            >
              <Printer className="w-4 h-4" />
              Print Labels
            </button>
            <button
              onClick={() => handleAction("canceled")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-error hover:text-on-error text-[#ffdad6] text-sm font-medium transition-colors font-sans"
            >
              <PackageX className="w-4 h-4" />
              Cancel Orders
            </button>
          </div>

          <button
            onClick={clearSelection}
            className="ml-2 p-1.5 rounded-full hover:bg-on-primary/10 transition-colors"
            aria-label="Clear selection"
          >
            <X className="w-5 h-5 opacity-70 hover:opacity-100" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
