import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_eyebrow" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_lead" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_image_id" integer;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_image_url" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "hero_image_alt" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "story_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "values_eyebrow" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "values_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "values_intro" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "cta_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "cta_body" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "cta_label" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "cta_href" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "cta_whatsapp_label" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "seo_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "seo_description" varchar;

  CREATE TABLE IF NOT EXISTS "about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );

  DO $$ BEGIN
   ALTER TABLE "about" ADD CONSTRAINT "about_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "about_values" ADD CONSTRAINT "about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "about_hero_image_idx" ON "about" USING btree ("hero_image_id");
  CREATE INDEX IF NOT EXISTS "about_values_order_idx" ON "about_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_values_parent_id_idx" ON "about_values" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about" DROP CONSTRAINT IF EXISTS "about_hero_image_id_media_id_fk";
  DROP INDEX IF EXISTS "about_hero_image_idx";
  DROP TABLE IF EXISTS "about_values" CASCADE;
  ALTER TABLE "about" DROP COLUMN IF EXISTS "hero_eyebrow";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "hero_lead";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "hero_image_id";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "hero_image_url";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "hero_image_alt";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "story_title";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "values_eyebrow";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "values_title";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "values_intro";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "cta_title";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "cta_body";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "cta_label";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "cta_href";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "cta_whatsapp_label";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "seo_title";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "seo_description";`)
}
