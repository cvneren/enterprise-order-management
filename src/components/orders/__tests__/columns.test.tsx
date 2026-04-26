import { describe, it, expect, vi } from "vitest";
import { getColumns } from "../columns";
import { render, fireEvent } from "@testing-library/react";

describe("columns", () => {
  it("should call onSelectAll and onToggle correctly", () => {
    const onToggle = vi.fn();
    const onSelectAll = vi.fn();
    const allIds = ["1", "2"];

    // Test getColumns when nothing is selected
    const cols = getColumns([], onToggle, onSelectAll, allIds);
    const SelectCol = cols[0];

    // Test Header onChange when nothing is selected (should select all)
    const Header = SelectCol.header as React.FC<{ row?: unknown }>;
    const { container: headerContainer } = render(<Header />);
    const headerInput = headerContainer.querySelector("input");
    fireEvent.click(headerInput!);
    expect(onSelectAll).toHaveBeenCalledWith(allIds);

    // Test Header onChange when everything is selected (should deselect all)
    const colsSelected = getColumns(allIds, onToggle, onSelectAll, allIds);
    const HeaderSelected = colsSelected[0].header as React.FC<{ row?: unknown }>;
    const { container: headerSelectedContainer } = render(<HeaderSelected />);
    const headerSelectedInput = headerSelectedContainer.querySelector("input");
    fireEvent.click(headerSelectedInput!);
    expect(onSelectAll).toHaveBeenCalledWith([]);

    // Test Cell onChange and onClick stopPropagation
    const Cell = SelectCol.cell as React.FC<{ row?: unknown }>;
    const mockRow = { original: { id: "1" } };
    const { container: cellContainer } = render(<Cell row={mockRow} />);
    const cellInput = cellContainer.querySelector("input");
    const cellDiv = cellContainer.querySelector("div");

    // Click div to test stopPropagation
    const stopPropagation = vi.fn();
    const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
    Object.defineProperty(clickEvent, "stopPropagation", { value: stopPropagation });
    fireEvent(cellDiv!, clickEvent);
    expect(stopPropagation).toHaveBeenCalled();

    // Change input to test onToggle
    fireEvent.click(cellInput!);
    expect(onToggle).toHaveBeenCalledWith("1");
  });
});
