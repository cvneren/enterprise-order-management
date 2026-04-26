"use client";

import { useOrderStore } from "@/store/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Truck, CreditCard } from "lucide-react";
import { useState, useEffect } from "react";

export function OrderDetailsDrawer() {
  const viewedOrder = useOrderStore((state) => state.viewedOrder);
  const setViewedOrder = useOrderStore((state) => state.setViewedOrder);

  // Local state for real-time calculations
  const [localQuantity, setLocalQuantity] = useState(0);
  const [pricePerKg, setPricePerKg] = useState(0);

  useEffect(() => {
    if (viewedOrder) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocalQuantity(viewedOrder.quantity);
      setPricePerKg(viewedOrder.totalAmount / viewedOrder.quantity);
    }
  }, [viewedOrder]);

  const handleClose = () => {
    setViewedOrder(null);
  };

  const handleQuantityChange = (delta: number) => {
    setLocalQuantity((prev) => Math.max(1, prev + delta));
  };

  const total = localQuantity * pricePerKg;

  return (
    <AnimatePresence>
      {viewedOrder && (
        <>
          {/* Backdrop with Blur Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Slide-out Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface shadow-2xl border-l border-border flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background">
              <h2 className="font-heading text-xl font-semibold text-on-surface">
                Order {viewedOrder.id}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Customer Info */}
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] mb-3 flex items-center font-sans">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Customer Details
                </h3>
                <div className="bg-background rounded-lg p-4 border border-border">
                  <p className="font-medium text-on-surface text-lg">{viewedOrder.customerName}</p>
                  <p className="text-sm text-on-surface-variant mt-1 font-sans">
                    Order Date: {viewedOrder.date}
                  </p>
                  <div className="mt-3 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-variant text-on-surface-variant">
                    Status: {viewedOrder.status}
                  </div>
                </div>
              </section>

              {/* Order Items & Real-time adjustment */}
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] mb-3 flex items-center font-sans">
                  <Truck className="w-4 h-4 mr-2" />
                  Line Items
                </h3>
                <div className="bg-background rounded-lg border border-border overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <p className="font-medium text-on-surface">{viewedOrder.roastType}</p>
                    <p className="text-sm text-on-surface-variant mt-1 font-sans">
                      Whole Bean Coffee
                    </p>
                  </div>
                  <div className="p-4 bg-surface flex items-center justify-between">
                    <span className="text-sm font-medium text-on-surface-variant font-sans">
                      Quantity (kg)
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        className="p-1.5 rounded-md border border-border hover:bg-background transition-colors text-on-surface"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <input
                        type="number"
                        value={localQuantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            setLocalQuantity(Math.max(1, val));
                          } else if (e.target.value === "") {
                            // allow temporary empty state while typing, though handled gracefully by defaulting or keeping previous, actually just setting to 1 is easier but let's allow empty to be parsed as 1 or just update raw string if we want it perfect.
                            // Since state is number, if it's NaN we can just ignore or set to 1. Setting to 1 on empty is safest.
                            setLocalQuantity(1);
                          }
                        }}
                        className="font-sans font-medium w-16 text-center text-sm bg-background border border-border rounded-md py-1 focus:ring-1 focus:ring-primary focus:outline-none"
                        min="1"
                      />
                      <button
                        onClick={() => handleQuantityChange(1)}
                        className="p-1.5 rounded-md border border-border hover:bg-background transition-colors text-on-surface"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Real-time Price Calculation */}
              <section>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#71716E] mb-3 flex items-center font-sans">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Summary
                </h3>
                <div className="bg-background rounded-lg p-4 border border-border space-y-3 text-sm font-sans">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Base Price (per kg)</span>
                    <span className="font-medium text-on-surface">€{pricePerKg.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-medium text-on-surface">€{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Wholesale Discount (10%)</span>
                    <span className="font-medium text-[#ba1a1a]">-€{(total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-3 border-t border-border flex justify-between items-center">
                    <span className="font-semibold text-on-surface uppercase tracking-wide text-xs">
                      Total
                    </span>
                    <span className="font-semibold text-lg text-primary">
                      €{(total * 0.9).toFixed(2)}
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-border bg-background">
              <button className="w-full py-2.5 px-4 bg-primary text-on-primary font-medium rounded-md hover:bg-primary/90 transition-colors shadow-sm font-sans">
                Save Adjustments
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
