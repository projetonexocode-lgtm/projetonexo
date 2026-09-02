import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const isNexoHost =
    host.startsWith("nexoservices.") || host.includes("nexoservices.pt");

  if (isNexoHost && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/reparacoes";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
