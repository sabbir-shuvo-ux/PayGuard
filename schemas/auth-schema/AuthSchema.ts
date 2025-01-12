import { z } from "zod";

export const AuthSchema = z.object({
  email: z
    .string()
    .email({ message: "Please Enter a Valid Email Address" })
    .min(1),

  password: z
    .string()
    .min(8, { message: "Please Enter a Valid Password" })
    .max(20, { message: "Please Enter a Valid Password" }),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;
