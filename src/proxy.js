import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const adminRoutes = ["/dashboard"];
const privateRoutes = ["/my-booking", "/service", "/profile"];

export async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  //! Not logged in
  if (!token && (isAdminRoute || isPrivateRoute)) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  //! Not admin but trying to access dashboard
  if (isAdminRoute && token?.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/403"; // forbidden page
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/service/:path*", "/my-booking/:path*", "/profile/:path*"],
};
