import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
  process.exit(0);
}

const payloadBin = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../node_modules/.bin/payload",
);

const result = spawnSync(payloadBin, ["migrate"], {
  stdio: "inherit",
  env: process.env,
});

process.exit(result.status ?? 1);
