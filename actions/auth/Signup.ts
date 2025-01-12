"use server";

import bcryptjs from "bcryptjs";

// zod schema
import {
  AuthSchema,
  type AuthSchemaType,
} from "@/schemas/auth-schema/AuthSchema";

// mongodb config and user model
import { DBConnection } from "@/config/DBConnection";
import User from "@/models/UserModel";

export const Signup = async (
  data: AuthSchemaType
): Promise<{ success: boolean; message?: string }> => {
  // Validate the input data type using Zod schema
  const isDataTypeValid = AuthSchema.safeParse(data);

  if (!isDataTypeValid.success) {
    throw new Error("Data type is not valid");
  }

  // Connect to the database
  DBConnection();

  const { email, password } = data;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return {
      message: "User already exists with this email",
      success: false,
    };
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcryptjs.hash(password, 10);

  // Create a new user in the database
  const newUser = await User.create({
    email,
    password: hashedPassword,
    role: "user", // Default role as 'user'
  });

  if (!newUser) {
    throw new Error("Failed to create user");
  }

  return {
    success: true,
    message: "Signup successful",
  };
};
