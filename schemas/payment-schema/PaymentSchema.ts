import { z } from "zod";

export const PaymentRequestSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "Amount must be a positive number",
    }),
});

export type PaymentRequestSchemaType = z.infer<typeof PaymentRequestSchema>;
