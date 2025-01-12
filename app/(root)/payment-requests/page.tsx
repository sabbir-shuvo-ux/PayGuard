import { payments } from "@/data/tableDummyData";
import { columns } from "./columns";
import RequestForm from "./RequestForm";
import { DataTable } from "@/components/ui/data-table";

const AllPayementRequestPage = () => {
  return (
    <section>
      <RequestForm />

      <div className="my-10 py-8 border-y border-red-400">
        <DataTable columns={columns} data={payments} />
      </div>
    </section>
  );
};

export default AllPayementRequestPage;
