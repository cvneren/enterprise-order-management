"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/lib/mockData";
import { clsx } from "clsx";

export const getColumns = (
  selectedIds: string[],
  onToggle: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[]
): ColumnDef<Order>[] => [
  {
    id: "select",
    header: () => {
      const isAllSelected = selectedIds.length === allIds.length && allIds.length > 0;
      return (
        <div className="flex items-center justify-center px-2">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
            checked={isAllSelected}
            onChange={() => {
              if (isAllSelected) {
                onSelectAll([]);
              } else {
                onSelectAll(allIds);
              }
            }}
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row }) => {
      const isSelected = selectedIds.includes(row.original.id);
      return (
        <div className="flex items-center justify-center px-2" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer accent-primary"
            checked={isSelected}
            onChange={() => onToggle(row.original.id)}
            aria-label={`Select row ${row.original.id}`}
          />
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => (
      <span className="font-sans font-medium text-sm tracking-tight">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <span className="font-sans text-sm">{row.getValue("date")}</span>,
  },
  {
    accessorKey: "customerName",
    header: "Customer",
    cell: ({ row }) => (
      <span className="font-sans font-medium text-sm">{row.getValue("customerName")}</span>
    ),
  },
  {
    accessorKey: "roastType",
    header: "Roast",
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#EFEDE8] text-[#3D2B1F] border border-[#d2c4bc]">
        {row.getValue("roastType")}
      </span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Qty (kg)",
    cell: ({ row }) => (
      <span className="font-sans font-medium text-sm tracking-tight text-right block w-full">
        {row.getValue("quantity")}
      </span>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
      return (
        <span className="font-sans font-medium text-sm tracking-tight text-right block w-full">
          {formatted}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span
          className={clsx(
            "inline-flex items-center px-2 py-1 rounded text-xs font-semibold",
            status === "Delivered" && "bg-[#d1e9d1] text-[#0d1f11]",
            status === "Shipped" && "bg-[#735a3a] text-white",
            status === "Processing" && "bg-[#d0e4ff] text-[#001d36]",
            status === "Pending" && "bg-[#fff1a8] text-[#3a3000]"
          )}
        >
          <span
            className={clsx(
              "w-1.5 h-1.5 rounded-full mr-1.5",
              status === "Delivered" && "bg-[#384b3a]",
              status === "Shipped" && "bg-white/80",
              status === "Processing" && "bg-[#003258]",
              status === "Pending" && "bg-[#615100]"
            )}
          ></span>
          {status}
        </span>
      );
    },
  },
];
