import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authTokens = request.cookies.get("AUTH_TOKEN")?.value;

  if (request.nextUrl.pathname.includes("/dashboard") && !authTokens) {
    // No autenticado
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("AUTH_TOKEN");
    return response;
  }
  // codigo de más, pero es para tener referencia
  if (request.nextUrl.pathname.includes("/login") && authTokens) {
    // autenticado
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard", "/login"],
};
