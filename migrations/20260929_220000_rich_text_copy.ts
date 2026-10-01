import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

const COPY_COLUMNS = [
  ['site', 'hero_lede'],
  ['site', 'coverage_body'],
  ['site', 'blog_intro'],
  ['site', 'blog_empty_body'],
  ['site', 'blog_empty_aside'],
  ['site', 'blog_page_intro'],
  ['site', 'blog_page_empty_body'],
  ['site', 'blog_page_empty_aside'],
  ['site', 'faq_intro'],
  ['site', 'footer_intro'],
  ['site', 'footer_guarantees'],
  ['site', 'footer_also_do_body'],
  ['site_method_steps', 'body'],
  ['site_faq_policy_items', 'text'],
  ['site_faqs', 'answer'],
  ['site_terms_paragraphs', 'text'],
  ['about', 'hero_lead'],
  ['about', 'mission_body'],
  ['about', 'values_intro'],
  ['about', 'process_intro'],
  ['about', 'audiences_intro'],
  ['about', 'cta_body'],
  ['about_paragraphs', 'text'],
  ['about_values', 'body'],
  ['about_process_steps', 'body'],
  ['about_audiences', 'body'],
  ['services', 'description'],
  ['services_page', 'intro'],
  ['services_page', 'nexo_body'],
  ['gallery', 'intro'],
  ['gallery', 'environments_intro'],
  ['gallery', 'mosaic_contact_body'],
  ['gallery', 'mosaic_work_fallback_body'],
  ['gallery_projects', 'caption'],
  ['contact', 'body'],
  ['contact', 'success_message'],
  ['contact', 'consent'],
  ['posts', 'excerpt'],
] as const

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE OR REPLACE FUNCTION plain_text_to_lexical(input text)
  RETURNS jsonb
  LANGUAGE sql
  IMMUTABLE
  AS $fn$
    SELECT jsonb_build_object(
      'root', jsonb_build_object(
        'type', 'root',
        'format', '',
        'indent', 0,
        'version', 1,
        'direction', 'ltr',
        'children', COALESCE(
          (
            SELECT jsonb_agg(paragraph ORDER BY ord)
            FROM (
              SELECT
                ord,
                jsonb_build_object(
                  'type', 'paragraph',
                  'format', '',
                  'indent', 0,
                  'version', 1,
                  'direction', 'ltr',
                  'textFormat', 0,
                  'textStyle', '',
                  'children', jsonb_build_array(
                    jsonb_build_object(
                      'type', 'text',
                      'text', btrim(para),
                      'format', 0,
                      'detail', 0,
                      'mode', 'normal',
                      'style', '',
                      'version', 1
                    )
                  )
                ) AS paragraph
              FROM regexp_split_to_table(
                replace(COALESCE(input, ''), chr(13), ''),
                chr(10) || '+'
              ) WITH ORDINALITY AS lines(para, ord)
              WHERE btrim(para) <> ''
            ) paragraphs
          ),
          jsonb_build_array(
            jsonb_build_object(
              'type', 'paragraph',
              'format', '',
              'indent', 0,
              'version', 1,
              'direction', 'ltr',
              'textFormat', 0,
              'textStyle', '',
              'children', jsonb_build_array(
                jsonb_build_object(
                  'type', 'text',
                  'text', COALESCE(input, ''),
                  'format', 0,
                  'detail', 0,
                  'mode', 'normal',
                  'style', '',
                  'version', 1
                )
              )
            )
          )
        )
      )
    );
  $fn$;

  CREATE OR REPLACE FUNCTION convert_copy_to_lexical(target_table text, target_column text)
  RETURNS void
  LANGUAGE plpgsql
  AS $fn$
  BEGIN
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = target_table
        AND column_name = target_column
    ) THEN
      RETURN;
    END IF;

    IF EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = target_table
        AND column_name = target_column
        AND udt_name = 'jsonb'
    ) THEN
      RETURN;
    END IF;

    EXECUTE format('ALTER TABLE %I ALTER COLUMN %I DROP DEFAULT', target_table, target_column);
    EXECUTE format(
      'ALTER TABLE %I ALTER COLUMN %I TYPE jsonb USING (
        CASE
          WHEN %I IS NULL THEN NULL
          WHEN left(%I::text, 1) = ''{'' THEN %I::jsonb
          ELSE plain_text_to_lexical(%I::text)
        END
      )',
      target_table,
      target_column,
      target_column,
      target_column,
      target_column,
      target_column
    );
  END
  $fn$;`)

  for (const [table, column] of COPY_COLUMNS) {
    await db.execute(sql`SELECT convert_copy_to_lexical(${table}, ${column})`)
  }

  await db.execute(sql`
  DROP FUNCTION IF EXISTS convert_copy_to_lexical(text, text);
  DROP FUNCTION IF EXISTS plain_text_to_lexical(text);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  CREATE OR REPLACE FUNCTION lexical_to_plain(input jsonb)
  RETURNS text
  LANGUAGE sql
  IMMUTABLE
  AS $fn$
    SELECT COALESCE(
      (
        SELECT string_agg(paragraph, E'\n\n' ORDER BY ord)
        FROM (
          SELECT
            ord,
            (
              SELECT string_agg(node->>'text', '' ORDER BY text_ord)
              FROM jsonb_array_elements(
                CASE
                  WHEN jsonb_typeof(paragraph->'children') = 'array' THEN paragraph->'children'
                  ELSE '[]'::jsonb
                END
              ) WITH ORDINALITY AS nodes(node, text_ord)
              WHERE COALESCE(node->>'text', '') <> ''
            ) AS paragraph
          FROM jsonb_array_elements(
            CASE
              WHEN input IS NULL THEN '[]'::jsonb
              WHEN jsonb_typeof(input->'root'->'children') = 'array' THEN input->'root'->'children'
              ELSE '[]'::jsonb
            END
          ) WITH ORDINALITY AS paragraphs(paragraph, ord)
        ) lines
        WHERE COALESCE(paragraph, '') <> ''
      ),
      ''
    );
  $fn$;

  CREATE OR REPLACE FUNCTION convert_lexical_to_copy(target_table text, target_column text)
  RETURNS void
  LANGUAGE plpgsql
  AS $fn$
  BEGIN
    IF NOT EXISTS (
      SELECT 1
      FROM information_schema.columns
      WHERE table_schema = 'public'
        AND table_name = target_table
        AND column_name = target_column
        AND udt_name = 'jsonb'
    ) THEN
      RETURN;
    END IF;

    EXECUTE format(
      'ALTER TABLE %I ALTER COLUMN %I TYPE varchar USING (
        CASE
          WHEN %I IS NULL THEN NULL
          ELSE lexical_to_plain(%I)
        END
      )',
      target_table,
      target_column,
      target_column,
      target_column
    );
  END
  $fn$;`)

  for (const [table, column] of COPY_COLUMNS) {
    await db.execute(sql`SELECT convert_lexical_to_copy(${table}, ${column})`)
  }

  await db.execute(sql`
  DROP FUNCTION IF EXISTS convert_lexical_to_copy(text, text);
  DROP FUNCTION IF EXISTS lexical_to_plain(jsonb);`)
}
