import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "footer_certificate_heading" varchar;
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "footer_certificate_issuer" varchar;
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "footer_certificate_company" varchar;
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "footer_certificate_nipc" varchar;
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "footer_certificate_alvara" varchar;
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "footer_also_do_title" varchar;
  ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "footer_also_do_body" varchar;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "site" DROP COLUMN IF EXISTS "footer_certificate_heading";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "footer_certificate_issuer";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "footer_certificate_company";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "footer_certificate_nipc";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "footer_certificate_alvara";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "footer_also_do_title";
  ALTER TABLE "site" DROP COLUMN IF EXISTS "footer_also_do_body";`)
}
