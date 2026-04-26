"use client";

import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Order } from "@/lib/mockData";
import { getColumns } from "./columns";
import { useOrderStore } from "@/store/useStore";
import { Search, ArrowUpDown } from "lucide-react";
import { clsx } from "clsx";

interface DataTableProps {
  data: Order[];
}

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const selectedOrderIds = useOrderStore((state) => state.selectedOrderIds);
  const toggleOrderSelection = useOrderStore((state) => state.toggleOrderSelection);
  const selectAll = useOrderStore((state) => state.selectAll);

  const allIds = useMemo(() => data.map((d) => d.id), [data]);

  const columns = useMemo(
    () => getColumns(selectedOrderIds, toggleOrderSelection, selectAll, allIds),
    [selectedOrderIds, toggleOrderSelection, selectAll, allIds]
  );
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-on-surface-variant" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-md bg-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-on-surface-variant/70 text-on-surface font-sans"
              placeholder="Search orders..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("status")?.setFilterValue(event.target.value)}
            className="block w-full sm:w-40 px-3 py-2 border border-border rounded-md bg-surface text-sm focus:ring-1 focus:ring-primary focus:border-primary text-on-surface font-sans"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="text-sm font-sans text-on-surface-variant">
          Showing {table.getRowModel().rows.length} orders
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#F9F9F8] border-b border-border">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className="px-4 py-3 font-sans text-[11px] font-semibold text-[#71716E] uppercase tracking-[0.05em]"
                        style={{ width: header.getSize() !== 150 ? header.getSize() : "auto" }}
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={clsx(
                              "flex items-center",
                              header.column.getCanSort() &&
                                "cursor-pointer select-none hover:text-primary transition-colors"
                            )}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              <ArrowUpDown className="ml-2 w-3 h-3 opacity-50" />
                            )}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-border">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const isSelected = selectedOrderIds.includes(row.original.id);
                  return (
                    <tr
                      key={row.id}
                      onClick={() => useOrderStore.getState().setViewedOrder(row.original)}
                      className={clsx(
                        "hover:bg-background transition-colors cursor-pointer",
                        isSelected && "bg-primary-container/10 hover:bg-primary-container/20"
                      )}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-on-surface-variant font-sans"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
