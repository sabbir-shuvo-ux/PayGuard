"use server";

import { DBConnection } from "@/config/DBConnection";
import { getDataFormDB } from "@/lib/getDataFromDB";
import { getDataFromToken } from "@/lib/getDataFromToken";
import PaymentRequest from "@/models/PaymentModel";
import { revalidatePath } from "next/cache";

export const PaymentConfirmation = async (
  id: string,
  type: "approved" | "rejected"
) => {
  // database connection and validate the token
  await DBConnection();
  const token = await getDataFromToken();
  if (!token) throw new Error("User session expired");

  // Fetch user information
  const user = await getDataFormDB(token.id);
  if (!user) throw new Error("User not valid");
  if (user.role !== "admin")
    throw new Error("You cannot perform this operation");

  // Validate the update type and perform the operation
  if (!["approved", "rejected"].includes(type)) {
    throw new Error("Invalid status type");
  }

  const res = await PaymentRequest.findByIdAndUpdate(id, { status: type });
  if (!res) throw new Error("Failed to update status");

  // Revalidate the cache for the page
  revalidatePath("/payment-requests", "layout");

  return { success: true };
};
