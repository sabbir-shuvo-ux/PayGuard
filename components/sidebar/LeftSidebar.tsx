import { menuData } from "@/data/menuData";
import Link from "next/link";
import { Button } from "../ui/button";

const LeftSidebar = async () => {
  return (
    <div className="border-r border-accent border-solid h-full min-h-screen max-h-screen overflow-y-auto">
      <ul className="flex flex-col gap-3">
        {menuData?.map((item, index: number) => (
          <Button asChild variant={"link"} key={index}>
            <Link href={item.url} title={item.label}>
              {item.label}
            </Link>
          </Button>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
