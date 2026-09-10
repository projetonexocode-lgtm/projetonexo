export function isNexoHost(host: string): boolean {
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";
  return (
    hostname.startsWith("nexoservices.") ||
    hostname === "nexoservices.pt" ||
    hostname === "www.nexoservices.pt"
  );
}
