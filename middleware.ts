import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

interface CustomJWTPayload extends JWTPayload {
  id: string;
}

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get("auth-token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    // Verify the JWT if the token exists
    if (cookie) {
      const { payload } = await jwtVerify(cookie, secret);
      const jwtPayload = payload as CustomJWTPayload;

      if (jwtPayload.id) {
        // Redirect valid users away from "/login" to "/"
        if (request.nextUrl.pathname.startsWith("/login")) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        // Allow access to other paths
        return NextResponse.next();
      }
    }

    // Redirect unauthenticated users away from protected paths
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (err) {
    console.log("Error verifying token:", err);

    // Redirect to "/login" if an error occurs and the user isn't already on "/login"
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Apply middleware to all paths
};
