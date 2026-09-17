import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "process_image_id" integer;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "process_image_url" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "process_image_alt" varchar;

  DO $$ BEGIN
   ALTER TABLE "about" ADD CONSTRAINT "about_process_image_id_media_id_fk" FOREIGN KEY ("process_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "about_process_image_idx" ON "about" USING btree ("process_image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about" DROP CONSTRAINT IF EXISTS "about_process_image_id_media_id_fk";
  DROP INDEX IF EXISTS "about_process_image_idx";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "process_image_id";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "process_image_url";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "process_image_alt";`)
}
