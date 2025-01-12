type menuDataType = {
  label: string;
  role: "user" | "admin";
  url: string;
};

export const menuData: menuDataType[] = [
  { label: "Dashboard", role: "user", url: "/" },
  {
    label: "All Payment Request",
    role: "user",
    url: "/payment-requests",
  },
  {
    label: "All Documents",
    role: "user",
    url: "/documents",
  },
];
