"use server";

import { DBConnection } from "@/config/DBConnection";
import { getDataFromToken } from "@/lib/getDataFromToken";
import PaymentRequest from "@/models/PaymentModel";
import User from "@/models/UserModel";
import {
  type PaymentRequestSchemaType,
  PaymentRequestSchema,
} from "@/schemas/payment-schema/PaymentSchema";

export const RequtestPayment = async (data: PaymentRequestSchemaType) => {
  const isValidData = PaymentRequestSchema.safeParse(data);

  if (!isValidData) {
    throw new Error("Data is Not Valid");
  }

  await DBConnection();

  const token = await getDataFromToken();

  if (!token) {
    throw new Error("User session expired");
  }

  const user = await User.findById(token.id);

  if (!user) {
    throw new Error("User is not valid");
  }

  if (user.role !== "admin" && user.role !== "user") {
    throw new Error("Insufficient permissions");
  }

  const { amount, title } = data;

  const paymentRequest = await PaymentRequest.create({
    title,
    amount,
    status: "pending",
    user_id: user._id,
  });

  if (!paymentRequest) {
    throw new Error("Failed to create payment request");
  }

  return {
    success: true,
  };
};
