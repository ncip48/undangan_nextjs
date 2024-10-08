import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./app/lib";
import { verifyJwtToken } from "./lib/token";
import { ResponseApiFail } from "./app/api/utils/response";

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
  //API Middleware
  const path = req.nextUrl.pathname;

  // Define patterns for public routes
  const publicRoutePatterns = [
    /^\/api\/auth\/login$/,
    /^\/api\/auth\/register$/,
    /^\/api\/image$/,
    /^\/api\/weddings\/[^\/]+$/, // Regex pattern for /api/weddings/:username
    /^\/api\/templates$/, // Added pattern for /api/templates
  ];

  // Check if the path matches any public route patterns
  const isPublicRoute = publicRoutePatterns.some((pattern) =>
    pattern.test(path)
  );

  const token = req.headers.get("Authorization")?.split(" ")[1];

  const verifiedToken =
    token &&
    (await verifyJwtToken(token).catch((error) => {
      console.log("Token verification error ", error);
    }));

  if (path.startsWith("/api")) {
    if (isPublicRoute) {
      return NextResponse.next();
    } else if (!isPublicRoute && !verifiedToken) {
      return ResponseApiFail("Unauthorized", 401);
    }
  }
  //End API Middleware

  const getAuth = await getSession();
  const role = getAuth?.user?.profile?.role;

  if (!getAuth && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/auth", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (getAuth && req.nextUrl.pathname == "/auth") {
    // if (role == 0) {
    //   const absoluteURL = new URL("/scan", req.nextUrl.origin);
    //   return NextResponse.redirect(absoluteURL.toString());
    // }
    const absoluteURL = new URL("/panel/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // if (role == 0 && dissallowRouteGuru.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/scan", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }

  // if (role == 1 && dissallowKepsek.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }

  // if (role == 2 && dissallowAdmin.includes(req.nextUrl.pathname)) {
  //   const absoluteURL = new URL("/siswa", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}
