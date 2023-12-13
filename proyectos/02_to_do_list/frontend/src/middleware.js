import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authTokens = request.cookies.get("AUTH_TOKEN")?.value;

  if (request.nextUrl.pathname.includes("/user") && !authTokens) {
    // No autenticado
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("AUTH_TOKEN");
    return response;
  }
  // codigo de más, pero es para tener referencia
  if (
    (request.nextUrl.pathname.includes("/register") && authTokens) ||
    (request.nextUrl.pathname.includes("/forgot-password") && authTokens) ||
    // falta la validación con rutas dinámicas
    (request.nextUrl.pathname.includes("/recover-password/:token") && authTokens) ||
    (request.nextUrl.pathname.includes("/login") && authTokens)
  ) {
    // autenticado
    const response = NextResponse.redirect(new URL("/user", request.url));
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user",
    "/login",
    "/register",
    "/forgot-password",
    "/recover-password/:token",
  ],
};
