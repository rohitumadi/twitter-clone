import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { apiAuthPrefix, publicRoutes } from "./route";

export default async function middleware(req: Request) {
  const { url: nextUrl } = req;
  const session = await auth(); // Ensure auth() returns a promise
  const isLoggedIn = !!session;
  const isApiAuthRoute = nextUrl.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl);

  // Allow access to API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  // Allow access to public routes without authentication
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!isLoggedIn && !isPublicRoute) {
    console.log("Redirecting to home page");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Continue to the requested page if authenticated
  return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  //invoke middleware except for the following routes
  matcher: ["/notifications", "/user/:userId/:path*"],
};

//every route that we add in matchers is going to invoke
//middleware auth function above
