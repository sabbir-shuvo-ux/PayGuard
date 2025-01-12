import { getDataFromToken } from "@/lib/getDataFromToken";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const user = await getDataFromToken();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <p>hello</p>
    </div>
  );
};

export default HomePage;
