import { create } from "zustand";
import { Order } from "@/lib/mockData";

interface OrderState {
  selectedOrderIds: string[];
  viewedOrder: Order | null;
  toggleOrderSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  setViewedOrder: (order: Order | null) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  selectedOrderIds: [],
  viewedOrder: null,
  toggleOrderSelection: (id) =>
    set((state) => ({
      selectedOrderIds: state.selectedOrderIds.includes(id)
        ? state.selectedOrderIds.filter((orderId) => orderId !== id)
        : [...state.selectedOrderIds, id],
    })),
  selectAll: (ids) => set({ selectedOrderIds: ids }),
  clearSelection: () => set({ selectedOrderIds: [] }),
  setViewedOrder: (order) => set({ viewedOrder: order }),
}));
