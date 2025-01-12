import { z } from "zod";

export const PaymentRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.coerce
    .number()
    .positive("Amount must be a positive number")
    .gt(0, "Amount must be greater than 0"),
});

export type PaymentRequestSchemaType = z.infer<typeof PaymentRequestSchema>;
