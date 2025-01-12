import { Suspense } from "react";
import PaymentTable from "./PaymentTable";
import RequestForm from "./RequestForm";
import { PaymentConfirmed } from "@/actions/payments/PaymentConfirmed";
import { toast } from "sonner";

const AllPayementRequestPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // success
  // if (searchParams.amount) {

  // }

  if (searchParams.success && searchParams.id) {
    await PaymentConfirmed(searchParams.id as string);
  }

  return (
    <section>
      <RequestForm />

      <Suspense fallback={<p>Loading...</p>}>
        <PaymentTable />
      </Suspense>
    </section>
  );
};

export default AllPayementRequestPage;
