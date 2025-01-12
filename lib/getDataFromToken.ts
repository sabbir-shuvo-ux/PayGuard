import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { handleError } from "./handleError";

// interface for the token payload
interface Tokenpayload {
  id: string;
  role: string;
  email: string;
  iat?: number;
  exp?: number;
}

// extract and verify JWT token from cookies
export const getDataFromToken = async (): Promise<Tokenpayload | null> => {
  try {
    // Retrieve the JWT token from the cookies
    const token = cookies().get("auth-token")?.value || "";

    // Verify the JWT using the secret key and decode its payload
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as Tokenpayload;

    // Return the decoded payload if verification is successful
    return decodedToken;
  } catch (err: unknown) {
    const res = handleError(err);
    console.log(res.error);

    // Return null if token verification fails
    return null;
  }
};
