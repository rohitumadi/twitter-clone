import NextAuth from "next-auth";

import { authConfig } from "./lib/auth";
import { publicRoutes } from "./route";
export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }
  //if user is on public route, don't invoke middleware
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  //invoke middleware except for the following routes
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

//every route that we add in matchers is going to invoke
//middleware auth function above
