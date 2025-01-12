type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "1a2b3c4d",
    amount: 150,
    status: "success",
    email: "user1@example.com",
  },
  {
    id: "2b3c4d5e",
    amount: 200,
    status: "failed",
    email: "user2@example.com",
  },
  {
    id: "3c4d5e6f",
    amount: 300,
    status: "processing",
    email: "user3@example.com",
  },
  {
    id: "4d5e6f7g",
    amount: 250,
    status: "pending",
    email: "user4@example.com",
  },
  {
    id: "5e6f7g8h",
    amount: 175,
    status: "success",
    email: "user5@example.com",
  },
  {
    id: "6f7g8h9i",
    amount: 220,
    status: "processing",
    email: "user6@example.com",
  },
  {
    id: "7g8h9i0j",
    amount: 320,
    status: "failed",
    email: "user7@example.com",
  },
  {
    id: "8h9i0j1k",
    amount: 180,
    status: "pending",
    email: "user8@example.com",
  },
  {
    id: "9i0j1k2l",
    amount: 400,
    status: "success",
    email: "user9@example.com",
  },
  {
    id: "0j1k2l3m",
    amount: 500,
    status: "processing",
    email: "user10@example.com",
  },
  {
    id: "1k2l3m4n",
    amount: 275,
    status: "failed",
    email: "user11@example.com",
  },
  {
    id: "2l3m4n5o",
    amount: 350,
    status: "pending",
    email: "user12@example.com",
  },
  {
    id: "3m4n5o6p",
    amount: 150,
    status: "success",
    email: "user13@example.com",
  },
  {
    id: "4n5o6p7q",
    amount: 100,
    status: "processing",
    email: "user14@example.com",
  },
  {
    id: "5o6p7q8r",
    amount: 450,
    status: "failed",
    email: "user15@example.com",
  },
  {
    id: "6p7q8r9s",
    amount: 125,
    status: "pending",
    email: "user16@example.com",
  },
  {
    id: "7q8r9s0t",
    amount: 200,
    status: "success",
    email: "user17@example.com",
  },
  {
    id: "8r9s0t1u",
    amount: 275,
    status: "processing",
    email: "user18@example.com",
  },
];
