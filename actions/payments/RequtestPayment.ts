"use server";

import { DBConnection } from "@/config/DBConnection";
import { getDataFormDB } from "@/lib/getDataFromDB";
import { getDataFromToken } from "@/lib/getDataFromToken";
import PaymentRequest from "@/models/PaymentModel";

import {
  type PaymentRequestSchemaType,
  PaymentRequestSchema,
} from "@/schemas/payment-schema/PaymentSchema";
import { revalidatePath } from "next/cache";

export const RequtestPayment = async (data: PaymentRequestSchemaType) => {
  // validate data type
  const isValidData = PaymentRequestSchema.safeParse(data);
  if (!isValidData) throw new Error("Data is Not Valid");

  // database connection and validate the token
  await DBConnection();
  const token = await getDataFromToken();
  if (!token) throw new Error("User session expired");

  // fetch user information
  const user = await getDataFormDB(token.id);
  if (!user) throw new Error("User not valid");

  // distructured data for better readibility
  const { amount, title } = data;
  const { email, _id } = user;

  // store data into DB
  const res = await new PaymentRequest({
    title,
    amount,
    status: "pending",
    user_email: email,
    user_id: _id,
  });
  const isSave = await res.save();

  if (!isSave) throw new Error("Failed to create payment request");

  revalidatePath("/payment-requests", "layout");

  return {
    success: true,
  };
};
