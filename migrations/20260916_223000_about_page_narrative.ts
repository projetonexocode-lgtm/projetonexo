import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "mission_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "mission_body" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "process_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "process_intro" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "audiences_title" varchar;
  ALTER TABLE "about" ADD COLUMN IF NOT EXISTS "audiences_intro" varchar;
  ALTER TABLE "about_values" ADD COLUMN IF NOT EXISTS "href" varchar;
  ALTER TABLE "about_values" ADD COLUMN IF NOT EXISTS "link_label" varchar;

  CREATE TABLE IF NOT EXISTS "about_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );

  CREATE TABLE IF NOT EXISTS "about_audiences" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );

  DO $$ BEGIN
   ALTER TABLE "about_process_steps" ADD CONSTRAINT "about_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "about_audiences" ADD CONSTRAINT "about_audiences_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "about_process_steps_order_idx" ON "about_process_steps" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_process_steps_parent_id_idx" ON "about_process_steps" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_audiences_order_idx" ON "about_audiences" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_audiences_parent_id_idx" ON "about_audiences" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about_process_steps" DROP CONSTRAINT IF EXISTS "about_process_steps_parent_id_fk";
  ALTER TABLE "about_audiences" DROP CONSTRAINT IF EXISTS "about_audiences_parent_id_fk";
  DROP INDEX IF EXISTS "about_process_steps_order_idx";
  DROP INDEX IF EXISTS "about_process_steps_parent_id_idx";
  DROP INDEX IF EXISTS "about_audiences_order_idx";
  DROP INDEX IF EXISTS "about_audiences_parent_id_idx";
  DROP TABLE IF EXISTS "about_process_steps" CASCADE;
  DROP TABLE IF EXISTS "about_audiences" CASCADE;
  ALTER TABLE "about_values" DROP COLUMN IF EXISTS "href";
  ALTER TABLE "about_values" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "mission_title";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "mission_body";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "process_title";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "process_intro";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "audiences_title";
  ALTER TABLE "about" DROP COLUMN IF EXISTS "audiences_intro";`)
}
