import { describe, it, expect, beforeEach } from "vitest";
import { useOrderStore } from "../useStore";
import { Order } from "@/lib/mockData";

describe("useOrderStore", () => {
  // Reset store before each test
  beforeEach(() => {
    useOrderStore.setState({
      selectedOrderIds: [],
      viewedOrder: null,
    });
  });

  it("should initialize with empty selectedOrderIds and null viewedOrder", () => {
    const state = useOrderStore.getState();
    expect(state.selectedOrderIds).toEqual([]);
    expect(state.viewedOrder).toBeNull();
  });

  it("should toggle order selection (add)", () => {
    useOrderStore.getState().toggleOrderSelection("ORD-123");
    expect(useOrderStore.getState().selectedOrderIds).toEqual(["ORD-123"]);
  });

  it("should toggle order selection (remove)", () => {
    useOrderStore.setState({ selectedOrderIds: ["ORD-123", "ORD-456"] });
    useOrderStore.getState().toggleOrderSelection("ORD-123");
    expect(useOrderStore.getState().selectedOrderIds).toEqual(["ORD-456"]);
  });

  it("should select all provided ids", () => {
    const ids = ["ORD-1", "ORD-2", "ORD-3"];
    useOrderStore.getState().selectAll(ids);
    expect(useOrderStore.getState().selectedOrderIds).toEqual(ids);
  });

  it("should clear selection", () => {
    useOrderStore.setState({ selectedOrderIds: ["ORD-1", "ORD-2"] });
    useOrderStore.getState().clearSelection();
    expect(useOrderStore.getState().selectedOrderIds).toEqual([]);
  });

  it("should set viewed order", () => {
    const mockOrder: Order = {
      id: "ORD-999",
      customerName: "Test Customer",
      roastType: "Light",
      quantity: 10,
      totalAmount: 150,
      status: "Pending",
      date: "2023-10-01",
    };
    useOrderStore.getState().setViewedOrder(mockOrder);
    expect(useOrderStore.getState().viewedOrder).toEqual(mockOrder);

    useOrderStore.getState().setViewedOrder(null);
    expect(useOrderStore.getState().viewedOrder).toBeNull();
  });
});
