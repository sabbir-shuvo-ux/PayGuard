import { GetPaymentRequests } from "@/actions/payments/GetPaymentRequests";
import { DataTable } from "@/components/ui/data-table";
import { handleError } from "@/lib/handleError";
import { columns } from "./columns";
import { cn } from "@/lib/utils";
import PaymentDataTable from "./PaymentDataTable";

const PaymentTable = async () => {
  try {
    const res = await GetPaymentRequests();

    if (!res?.success) {
      throw new Error("Data is not available at this moment");
    }

    if (res.data.length === 0) {
      return <p>No payment requests found.</p>;
    }

    return (
      <PaymentDataTable data={res.data} isAdmin={res.isAdmin ? true : false} />
    );
  } catch (err: unknown) {
    const res = handleError(err);
    console.error("Error fetching payment requests:", res.error);

    return <p>Error fetching payment requests data</p>;
  }
};

export default PaymentTable;
