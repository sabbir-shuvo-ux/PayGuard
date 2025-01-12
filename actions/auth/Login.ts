"use server";

import { DBConnection } from "@/config/DBConnection";
import User from "@/models/UserModel";
import {
  AuthSchema,
  type AuthSchemaType,
} from "@/schemas/auth-schema/AuthSchema";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type UserType =
  | ({
      _id: string;
      role: "admin" | "user";
    } & AuthSchemaType)
  | null;

export const Login = async (data: AuthSchemaType) => {
  // Validate the input data type using Zod schema
  const isDataTypeValid = AuthSchema.safeParse(data);
  if (!isDataTypeValid) {
    throw new Error("Data Type Is Not Valid");
  }

  DBConnection();

  const { email, password } = data; // password is : 12345678 email: shuvosabbir134@gmail.com

  const user: UserType = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const validatePass = await bcryptjs.compare(password, user.password);
  if (!validatePass) {
    throw new Error("Invalid email or password.");
  }

  const tokenData = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const jwtToken = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  cookies().set({
    name: "auth-token",
    value: jwtToken,
    httpOnly: true,
  });

  redirect("/");
};
