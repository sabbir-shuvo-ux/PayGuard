import LeftSidebar from "@/components/sidebar/LeftSidebar";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="grid grid-cols-[300px_1fr] gap-8 h-full w-full">
      <LeftSidebar />
      {children}
    </div>
  );
};

export default MainLayout;
