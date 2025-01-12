import { Suspense } from "react";
import PaymentTable from "./PaymentTable";
import RequestForm from "./RequestForm";

const AllPayementRequestPage = async () => {
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
