import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS "about_mission_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"alt" varchar
  );

  DO $$ BEGIN
   ALTER TABLE "about_mission_images" ADD CONSTRAINT "about_mission_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  DO $$ BEGIN
   ALTER TABLE "about_mission_images" ADD CONSTRAINT "about_mission_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;

  CREATE INDEX IF NOT EXISTS "about_mission_images_order_idx" ON "about_mission_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "about_mission_images_parent_id_idx" ON "about_mission_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "about_mission_images_image_idx" ON "about_mission_images" USING btree ("image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "about_mission_images" DROP CONSTRAINT IF EXISTS "about_mission_images_image_id_media_id_fk";
  ALTER TABLE "about_mission_images" DROP CONSTRAINT IF EXISTS "about_mission_images_parent_id_fk";
  DROP INDEX IF EXISTS "about_mission_images_order_idx";
  DROP INDEX IF EXISTS "about_mission_images_parent_id_idx";
  DROP INDEX IF EXISTS "about_mission_images_image_idx";
  DROP TABLE IF EXISTS "about_mission_images" CASCADE;`)
}
