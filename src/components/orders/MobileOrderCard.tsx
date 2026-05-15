"use client";

import React, { useState } from "react";
import { Order } from "@/lib/mockData";
import { clsx } from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useOrderStore } from "@/store/useStore";

interface MobileOrderCardProps {
  order: Order;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function MobileOrderCard({ order, isSelected, onToggle }: MobileOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const setViewedOrder = useOrderStore((state) => state.setViewedOrder);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(order.totalAmount);

  return (
    <div
      className={clsx(
        "bg-surface border border-border rounded-lg mb-3 overflow-hidden shadow-sm transition-colors",
        isSelected && "bg-primary-container/5 border-primary/20"
      )}
    >
      {/* Header Info */}
      <div
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-3 -ml-3 flex items-center justify-center min-w-[44px] min-h-[44px]"
          >
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary accent-primary"
              checked={isSelected}
              onChange={() => onToggle(order.id)}
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-0.5">
              {order.id}
            </div>
            <div className="font-heading font-bold text-on-surface">
              {order.customerName}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className={clsx(
              "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight",
              order.status === "Delivered" && "bg-[#d1e9d1] text-[#0d1f11]",
              order.status === "Shipped" && "bg-[#735a3a] text-white",
              order.status === "Processing" && "bg-[#d0e4ff] text-[#001d36]",
              order.status === "Pending" && "bg-[#fff1a8] text-[#3a3000]"
            )}
          >
            {order.status}
          </span>
          <div className="text-sm font-bold text-primary">{formattedTotal}</div>
        </div>
      </div>

      {/* Accordion Body */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border bg-background/50">
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm mb-4">
            <div>
              <div className="text-[10px] font-semibold text-[#71716E] uppercase mb-1">Date</div>
              <div className="text-on-surface">{order.date}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-[#71716E] uppercase mb-1">Roast</div>
              <div className="text-on-surface">{order.roastType}</div>
            </div>
            <div>
              <div className="text-[10px] font-semibold text-[#71716E] uppercase mb-1">Quantity</div>
              <div className="text-on-surface font-medium">{order.quantity} kg</div>
            </div>
          </div>

          <button
            onClick={() => setViewedOrder(order)}
            className="w-full py-2 bg-surface-variant text-on-surface-variant text-sm font-semibold rounded-md hover:bg-surface-variant/80 transition-colors"
          >
            View Full Details
          </button>
        </div>
      )}

      {/* Expand/Collapse Indicator */}
      <div
        className="bg-surface-variant/20 flex justify-center py-1 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-on-surface-variant opacity-50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-on-surface-variant opacity-50" />
        )}
      </div>
    </div>
  );
}
