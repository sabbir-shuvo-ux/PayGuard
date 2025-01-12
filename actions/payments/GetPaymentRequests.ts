"use server";

import { DBConnection } from "@/config/DBConnection";
import { getDataFormDB } from "@/lib/getDataFromDB";
import { getDataFromToken } from "@/lib/getDataFromToken";
import PaymentRequest from "@/models/PaymentModel";

export type DataTableType = {
  id: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  email?: string;
};

export const GetPaymentRequests = async () => {
  // database connection and validate the token
  await DBConnection();
  const token = await getDataFromToken();
  if (!token) throw new Error("User session expired");

  // Fetch user information
  const user = await getDataFormDB(token.id);
  if (!user) throw new Error("User not valid");

  // Fetch data based on role and sort by updatedAt in descending order
  let data;
  if (user.role === "admin") {
    data = await PaymentRequest.find().sort({ updatedAt: -1 }).lean(); // Descending order
  } else if (user.role === "user") {
    data = await PaymentRequest.find({ user_id: user._id })
      .sort({ updatedAt: -1 }) // Descending order
      .lean();
  }

  if (!data || data.length === 0) {
    return { success: true, data: [] };
  }

  // formatting date to match frontend table type
  const formattedData: DataTableType[] = data.map((payment) => ({
    id: String(payment._id),
    amount: parseFloat(payment.amount.toString()),
    status: payment.status,
    email: user.role === "admin" ? payment.user_email : undefined,
    title: payment.title,
  }));

  return {
    success: true,
    data: formattedData,
    isAdmin: user.role === "admin" ? true : false, // Check if user is admin
  };
};
