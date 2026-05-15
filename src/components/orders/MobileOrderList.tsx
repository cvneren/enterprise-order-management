"use client";

import React from "react";
import { Order } from "@/lib/mockData";
import { MobileOrderCard } from "./MobileOrderCard";
import { useOrderStore } from "@/store/useStore";

interface MobileOrderListProps {
  data: Order[];
}

export function MobileOrderList({ data }: MobileOrderListProps) {
  const selectedOrderIds = useOrderStore((state) => state.selectedOrderIds);
  const toggleOrderSelection = useOrderStore((state) => state.toggleOrderSelection);

  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-on-surface-variant font-sans bg-surface rounded-lg border border-dashed border-border">
        No orders found matching your filters.
      </div>
    );
  }

  return (
    <div className="md:hidden">
      {data.map((order) => (
        <MobileOrderCard
          key={order.id}
          order={order}
          isSelected={selectedOrderIds.includes(order.id)}
          onToggle={toggleOrderSelection}
        />
      ))}
    </div>
  );
}
