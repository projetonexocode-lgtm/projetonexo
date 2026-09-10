import { NextResponse, type NextRequest } from "next/server";
import { isNexoHost } from "@/lib/nexo-host";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (isNexoHost(host) && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/reparacoes";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
