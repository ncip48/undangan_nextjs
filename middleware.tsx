import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/lib";

const protectedRoutes = [
  "/dashboard",
  "/siswa",
  "/report",
  "/scan",
  "/scan-out",
];
const dissallowRouteGuru = ["/dashboard", "/siswa", "/report"];
const dissallowAdmin = ["/dashboard", "/scan", "/report", "/scan-out"];
const dissallowKepsek = ["/scan", "/scan-out"];

export default async function middleware(req: NextRequest) {
  const getAuth = await getSession();
  const role = getAuth?.user?.profile?.role;

  if (req.nextUrl.pathname == "/") {
    if (!getAuth) {
      const absoluteURL = new URL("/auth", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    } else {
      if (role == 0) {
        const absoluteURL = new URL("/scan", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
      }
      const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (!getAuth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/auth", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (getAuth && req.nextUrl.pathname == "/auth") {
    if (role == 0) {
      const absoluteURL = new URL("/scan", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (role == 0 && dissallowRouteGuru.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/scan", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (role == 1 && dissallowKepsek.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (role == 2 && dissallowAdmin.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/siswa", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
