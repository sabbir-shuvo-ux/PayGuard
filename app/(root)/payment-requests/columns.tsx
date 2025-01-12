"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableType } from "@/actions/payments/GetPaymentRequests";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import { StatusSortingHeader } from "@/components/ui/StatusSortingHeader";
import { PaymentConfirmation } from "@/actions/payments/PaymentConfirmation";

// Status color mapping
const statusColor: Record<"pending" | "approved" | "rejected", string> = {
  pending: "text-yellow-500",
  approved: "text-green-500",
  rejected: "text-red-500",
};

// Component for rendering the status with colors
const StatusCell = ({
  status,
}: {
  status: "pending" | "approved" | "rejected";
}) => {
  return <span className={statusColor[status]}>{status}</span>;
};

export const columns: ColumnDef<DataTableType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    id: "title",
    header: "Title",
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "amount",
    id: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    id: "status",
    header: ({ column }) => (
      <StatusSortingHeader
        column={column}
        title="Status"
        statuses={["pending", "approved", "rejected"]}
      />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as
        | "pending"
        | "approved"
        | "rejected";
      return <StatusCell status={status} />;
    },
    enableSorting: true,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                className="w-full"
                onClick={() => PaymentConfirmation(payment.id, "approved")}
              >
                Approved
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Button
                className="w-full"
                variant={"destructive"}
                onClick={() => PaymentConfirmation(payment.id, "rejected")}
              >
                Reject
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
