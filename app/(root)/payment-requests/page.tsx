import { PaymentConfirmed } from "@/actions/payments/PaymentConfirmed";
import { Suspense } from "react";
import PaymentTable from "./PaymentTable";
import RequestForm from "./RequestForm";

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
