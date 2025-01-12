"use client";
import { cn } from "@/lib/utils";
import { columns } from "./columns";
import { DataTableType } from "@/actions/payments/GetPaymentRequests";
import { DataTable } from "@/components/ui/data-table";

type Props = {
  isAdmin: boolean;
  data: DataTableType[];
};

const PaymentDataTable = ({ isAdmin, data }: Props) => {
  const filteredColumns = isAdmin
    ? columns
    : columns.filter((col) => col.id !== "email" && col.id !== "actions");

  return (
    <div
      className={cn(
        "my-10 py-8 border-y border-red-400",
        !isAdmin && "table_container"
      )}
    >
      <DataTable columns={filteredColumns} data={data} />
    </div>
  );
};

export default PaymentDataTable;
