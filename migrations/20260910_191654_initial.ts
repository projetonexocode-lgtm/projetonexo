import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_category" AS ENUM('Obras', 'Remodelações', 'Reabilitação', 'Arquitetura', 'Processo');
  CREATE TYPE "public"."enum_about_placeholders_shape" AS ENUM('wide', 'round', 'square');
  CREATE TYPE "public"."enum_gallery_projects_fit" AS ENUM('cover', 'contain');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"whatsapp_label" varchar NOT NULL,
  	"contact_label" varchar,
  	"featured" boolean DEFAULT false,
  	"in_contact_form" boolean DEFAULT true,
  	"in_footer" boolean DEFAULT false,
  	"image_id" integer,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar,
  	"category" "enum_posts_category",
  	"published_at" timestamp(3) with time zone,
  	"cover_id" integer,
  	"body" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"services_id" integer,
  	"posts_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"src" varchar,
  	"alt" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_method_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "site_coverage_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_faq_policy_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "site_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "site_terms_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"link_href" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"legal_name" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"seo_description" varchar,
  	"whatsapp_e164" varchar NOT NULL,
  	"whatsapp_display" varchar NOT NULL,
  	"phone_display" varchar NOT NULL,
  	"phone_tel" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"nexo_services_url" varchar NOT NULL,
  	"nexo_services_label" varchar,
  	"whatsapp_cta" varchar NOT NULL,
  	"whatsapp_intro" varchar NOT NULL,
  	"hero_heading" varchar NOT NULL,
  	"hero_heading_highlight" varchar,
  	"hero_lede" varchar NOT NULL,
  	"hero_secondary_cta" varchar NOT NULL,
  	"hero_secondary_href" varchar NOT NULL,
  	"method_heading" varchar NOT NULL,
  	"method_photo_id" integer,
  	"method_photo_url" varchar,
  	"method_photo_alt" varchar,
  	"coverage_heading" varchar NOT NULL,
  	"coverage_highlight" varchar,
  	"coverage_subheading" varchar,
  	"coverage_subheading_highlight" varchar,
  	"coverage_body" varchar NOT NULL,
  	"coverage_map_label" varchar NOT NULL,
  	"coverage_maps_cta" varchar NOT NULL,
  	"maps_embed_url" varchar,
  	"maps_link" varchar,
  	"blog_heading" varchar DEFAULT 'Notas de obra',
  	"blog_heading_highlight" varchar DEFAULT 'obra',
  	"blog_intro" varchar DEFAULT 'Notas sobre processo, remodelação e reabilitação. Sem artigos inventados — o que estiver aqui foi publicado.',
  	"blog_all_cta" varchar DEFAULT 'Ver todas as notas',
  	"blog_read_cta" varchar DEFAULT 'Ler artigo',
  	"blog_empty_title" varchar DEFAULT 'Em breve',
  	"blog_empty_body" varchar DEFAULT 'O primeiro artigo aparece aqui quando for escrito. Até lá, este espaço permanece vazio de propósito.',
  	"blog_empty_aside" varchar DEFAULT 'Enquanto isso, o pedido de contacto chega a quem acompanha a obra.',
  	"blog_empty_cta" varchar DEFAULT 'Pedir contacto',
  	"blog_page_intro" varchar DEFAULT 'Notas sobre processo, remodelação e reabilitação. Enquanto não houver artigos publicados, esta listagem permanece vazia.',
  	"blog_page_empty_title" varchar DEFAULT 'Ainda sem artigos',
  	"blog_page_empty_body" varchar DEFAULT 'O primeiro artigo aparece aqui quando for publicado.',
  	"blog_page_empty_aside" varchar DEFAULT 'Para um pedido de obra, o formulário de contacto é o caminho directo.',
  	"faq_heading" varchar NOT NULL,
  	"faq_heading_highlight" varchar,
  	"faq_intro" varchar NOT NULL,
  	"faq_policy_heading" varchar NOT NULL,
  	"faq_whatsapp_cta" varchar NOT NULL,
  	"footer_intro" varchar NOT NULL,
  	"footer_guarantees" varchar NOT NULL,
  	"footer_guarantees_cta" varchar NOT NULL,
  	"footer_nexo_label" varchar NOT NULL,
  	"location_line" varchar NOT NULL,
  	"footer_contacts_heading" varchar DEFAULT 'Contactos',
  	"footer_contact_request_label" varchar DEFAULT 'Pedido de contacto',
  	"footer_whatsapp_prefix" varchar DEFAULT 'WhatsApp',
  	"footer_phone_prefix" varchar DEFAULT 'Telefone',
  	"footer_email_prefix" varchar DEFAULT 'E-mail',
  	"footer_blog_label" varchar DEFAULT 'Blog',
  	"footer_services_heading" varchar DEFAULT 'Serviços',
  	"footer_repairs_label" varchar DEFAULT 'Reparações',
  	"footer_guarantees_heading" varchar DEFAULT 'Garantias',
  	"footer_copyright" varchar DEFAULT 'Todos os direitos reservados.',
  	"terms_heading" varchar DEFAULT 'Termos de utilização',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "about_placeholders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"alt" varchar,
  	"shape" "enum_about_placeholders_shape" DEFAULT 'wide'
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"heading_highlight" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "services_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"contact_link_label" varchar NOT NULL,
  	"card_cta" varchar NOT NULL,
  	"nexo_kicker" varchar NOT NULL,
  	"nexo_heading" varchar NOT NULL,
  	"nexo_body" varchar NOT NULL,
  	"nexo_cta" varchar NOT NULL,
  	"service_whatsapp_cta" varchar DEFAULT 'Pedir este serviço no WhatsApp',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gallery_projects_title_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar NOT NULL
  );
  
  CREATE TABLE "gallery_projects_panels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"src" varchar,
  	"alt" varchar NOT NULL
  );
  
  CREATE TABLE "gallery_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"caption" varchar NOT NULL,
  	"is_real_work" boolean DEFAULT false,
  	"image_id" integer,
  	"image_url" varchar,
  	"alt" varchar NOT NULL,
  	"width" numeric DEFAULT 1600,
  	"height" numeric DEFAULT 1066,
  	"fit" "enum_gallery_projects_fit" DEFAULT 'cover'
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Obras e interiores.' NOT NULL,
  	"intro" varchar DEFAULT 'A colagem da troca de banheira por base de duche é obra real da Projeto Nexo. As restantes imagens são referências de ambiente, para pensar remodelação e reabilitação.',
  	"environments_heading" varchar DEFAULT 'Ambientes',
  	"environments_intro" varchar DEFAULT 'Referências de interiores e edificado. Não são um portefólio de obras concluídas.',
  	"contact_cta" varchar DEFAULT 'Pedir contacto',
  	"mosaic_contact_title" varchar DEFAULT 'Interiores',
  	"mosaic_contact_body" varchar DEFAULT 'Referências de ambiente para pensar a remodelação e a reabilitação.',
  	"mosaic_contact_cta" varchar DEFAULT 'Pedir contacto',
  	"mosaic_contact_href" varchar DEFAULT '/#contacto',
  	"mosaic_work_title" varchar DEFAULT 'Obra real',
  	"mosaic_work_cta" varchar DEFAULT 'Ver o processo',
  	"mosaic_work_href" varchar DEFAULT '/galeria',
  	"mosaic_work_fallback_title" varchar DEFAULT 'Obra e entrega',
  	"mosaic_work_fallback_body" varchar DEFAULT 'Um interlocutor, um plano legível e acompanhamento até à chave na mão.',
  	"mosaic_work_fallback_cta" varchar DEFAULT 'Ver a galeria',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"other_service_option" varchar DEFAULT 'Outro / ainda não sei',
  	"submit_label" varchar NOT NULL,
  	"submitting_label" varchar NOT NULL,
  	"success_message" varchar NOT NULL,
  	"consent" varchar NOT NULL,
  	"name_label" varchar NOT NULL,
  	"phone_label" varchar NOT NULL,
  	"phone_hint" varchar,
  	"email_label" varchar NOT NULL,
  	"email_hint" varchar,
  	"service_label" varchar NOT NULL,
  	"message_label" varchar NOT NULL,
  	"name_placeholder" varchar,
  	"phone_placeholder" varchar,
  	"email_placeholder" varchar,
  	"service_placeholder" varchar,
  	"message_placeholder" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_nav" ADD CONSTRAINT "site_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_hero_slides" ADD CONSTRAINT "site_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_hero_slides" ADD CONSTRAINT "site_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_method_steps" ADD CONSTRAINT "site_method_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_coverage_regions" ADD CONSTRAINT "site_coverage_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_faq_policy_items" ADD CONSTRAINT "site_faq_policy_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_faqs" ADD CONSTRAINT "site_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_terms_paragraphs" ADD CONSTRAINT "site_terms_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_method_photo_id_media_id_fk" FOREIGN KEY ("method_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_paragraphs" ADD CONSTRAINT "about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_placeholders" ADD CONSTRAINT "about_placeholders_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_placeholders" ADD CONSTRAINT "about_placeholders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_projects_title_lines" ADD CONSTRAINT "gallery_projects_title_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_projects_panels" ADD CONSTRAINT "gallery_projects_panels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_projects_panels" ADD CONSTRAINT "gallery_projects_panels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_projects" ADD CONSTRAINT "gallery_projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_projects" ADD CONSTRAINT "gallery_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_image_idx" ON "services" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_cover_idx" ON "posts" USING btree ("cover_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_nav_order_idx" ON "site_nav" USING btree ("_order");
  CREATE INDEX "site_nav_parent_id_idx" ON "site_nav" USING btree ("_parent_id");
  CREATE INDEX "site_hero_slides_order_idx" ON "site_hero_slides" USING btree ("_order");
  CREATE INDEX "site_hero_slides_parent_id_idx" ON "site_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "site_hero_slides_image_idx" ON "site_hero_slides" USING btree ("image_id");
  CREATE INDEX "site_method_steps_order_idx" ON "site_method_steps" USING btree ("_order");
  CREATE INDEX "site_method_steps_parent_id_idx" ON "site_method_steps" USING btree ("_parent_id");
  CREATE INDEX "site_coverage_regions_order_idx" ON "site_coverage_regions" USING btree ("_order");
  CREATE INDEX "site_coverage_regions_parent_id_idx" ON "site_coverage_regions" USING btree ("_parent_id");
  CREATE INDEX "site_faq_policy_items_order_idx" ON "site_faq_policy_items" USING btree ("_order");
  CREATE INDEX "site_faq_policy_items_parent_id_idx" ON "site_faq_policy_items" USING btree ("_parent_id");
  CREATE INDEX "site_faqs_order_idx" ON "site_faqs" USING btree ("_order");
  CREATE INDEX "site_faqs_parent_id_idx" ON "site_faqs" USING btree ("_parent_id");
  CREATE INDEX "site_terms_paragraphs_order_idx" ON "site_terms_paragraphs" USING btree ("_order");
  CREATE INDEX "site_terms_paragraphs_parent_id_idx" ON "site_terms_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "site_method_photo_idx" ON "site" USING btree ("method_photo_id");
  CREATE INDEX "about_paragraphs_order_idx" ON "about_paragraphs" USING btree ("_order");
  CREATE INDEX "about_paragraphs_parent_id_idx" ON "about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "about_placeholders_order_idx" ON "about_placeholders" USING btree ("_order");
  CREATE INDEX "about_placeholders_parent_id_idx" ON "about_placeholders" USING btree ("_parent_id");
  CREATE INDEX "about_placeholders_image_idx" ON "about_placeholders" USING btree ("image_id");
  CREATE INDEX "gallery_projects_title_lines_order_idx" ON "gallery_projects_title_lines" USING btree ("_order");
  CREATE INDEX "gallery_projects_title_lines_parent_id_idx" ON "gallery_projects_title_lines" USING btree ("_parent_id");
  CREATE INDEX "gallery_projects_panels_order_idx" ON "gallery_projects_panels" USING btree ("_order");
  CREATE INDEX "gallery_projects_panels_parent_id_idx" ON "gallery_projects_panels" USING btree ("_parent_id");
  CREATE INDEX "gallery_projects_panels_image_idx" ON "gallery_projects_panels" USING btree ("image_id");
  CREATE INDEX "gallery_projects_order_idx" ON "gallery_projects" USING btree ("_order");
  CREATE INDEX "gallery_projects_parent_id_idx" ON "gallery_projects" USING btree ("_parent_id");
  CREATE INDEX "gallery_projects_image_idx" ON "gallery_projects" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_nav" CASCADE;
  DROP TABLE "site_hero_slides" CASCADE;
  DROP TABLE "site_method_steps" CASCADE;
  DROP TABLE "site_coverage_regions" CASCADE;
  DROP TABLE "site_faq_policy_items" CASCADE;
  DROP TABLE "site_faqs" CASCADE;
  DROP TABLE "site_terms_paragraphs" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "about_paragraphs" CASCADE;
  DROP TABLE "about_placeholders" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "services_page" CASCADE;
  DROP TABLE "gallery_projects_title_lines" CASCADE;
  DROP TABLE "gallery_projects_panels" CASCADE;
  DROP TABLE "gallery_projects" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TYPE "public"."enum_posts_category";
  DROP TYPE "public"."enum_about_placeholders_shape";
  DROP TYPE "public"."enum_gallery_projects_fit";`)
}
