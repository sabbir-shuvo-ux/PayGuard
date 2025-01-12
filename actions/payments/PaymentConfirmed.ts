"use server";

import { DBConnection } from "@/config/DBConnection";
import { getDataFromToken } from "@/lib/getDataFromToken";
import PaymentRequest from "@/models/PaymentModel";
import { revalidatePath } from "next/cache";

export const PaymentConfirmed = async (id: string) => {
  // database connection and validate the token
  await DBConnection();
  const token = await getDataFromToken();
  if (!token) throw new Error("User session expired");

  const res = await PaymentRequest.findByIdAndUpdate(id, {
    status: "approved",
  });
  if (!res) throw new Error("Failed to update status");

  // Revalidate the cache for the page
  revalidatePath("/payment-requests", "layout");
};