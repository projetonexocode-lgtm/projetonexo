import { spawnSync } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { About } from "./globals/About";
import { Contact } from "./globals/Contact";
import { Gallery } from "./globals/Gallery";
import { ServicesPage } from "./globals/ServicesPage";
import { Site } from "./globals/Site";
import {
  DEFAULT_ABOUT,
  DEFAULT_CONTACT,
  DEFAULT_GALLERY,
  DEFAULT_SERVICES,
  DEFAULT_SERVICES_PAGE,
  DEFAULT_SITE,
} from "./lib/cms/defaults";
import { SERVICE_PHOTOS } from "./lib/service-photos";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const postgresUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL;

function sqliteDbPath() {
  const dbUrl = process.env.SQLITE_URL || "file:./payload.sqlite";
  return dbUrl.startsWith("file:") ? dbUrl.slice("file:".length) : dbUrl;
}

function runSqlite(sql: string) {
  spawnSync("sqlite3", [sqliteDbPath(), sql], { stdio: "ignore" });
}

function ensureSqliteSocialLinksTable() {
  if (postgresUrl) return;
  runSqlite(`
      CREATE TABLE IF NOT EXISTS site_social_links (
        _order integer NOT NULL,
        _parent_id integer NOT NULL,
        id text PRIMARY KEY NOT NULL,
        network text NOT NULL,
        url text,
        enabled integer DEFAULT false,
        FOREIGN KEY (_parent_id) REFERENCES site(id) ON UPDATE no action ON DELETE cascade
      );
      CREATE INDEX IF NOT EXISTS site_social_links_order_idx ON site_social_links (_order);
      CREATE INDEX IF NOT EXISTS site_social_links_parent_id_idx ON site_social_links (_parent_id);`);
}

function ensureSqliteAboutPageSchema() {
  if (postgresUrl) return;
  runSqlite(`
      CREATE TABLE IF NOT EXISTS about_values (
        _order integer NOT NULL,
        _parent_id integer NOT NULL,
        id text PRIMARY KEY NOT NULL,
        title text NOT NULL,
        body text NOT NULL,
        FOREIGN KEY (_parent_id) REFERENCES about(id) ON UPDATE no action ON DELETE cascade
      );
      CREATE INDEX IF NOT EXISTS about_values_order_idx ON about_values (_order);
      CREATE INDEX IF NOT EXISTS about_values_parent_id_idx ON about_values (_parent_id);`);
  const columns = [
    "hero_eyebrow",
    "hero_lead",
    "hero_image_id",
    "hero_image_url",
    "hero_image_alt",
    "story_title",
    "values_eyebrow",
    "values_title",
    "values_intro",
    "cta_title",
    "cta_body",
    "cta_label",
    "cta_href",
    "cta_whatsapp_label",
    "seo_title",
    "seo_description",
  ];
  for (const column of columns) {
    runSqlite(`ALTER TABLE about ADD COLUMN ${column} text;`);
  }
}

function ensureSqliteFooterCertificateSchema() {
  if (postgresUrl) return;
  const columns = [
    "footer_certificate_heading",
    "footer_certificate_issuer",
    "footer_certificate_company",
    "footer_certificate_nipc",
    "footer_certificate_alvara",
    "footer_also_do_title",
    "footer_also_do_body",
  ];
  for (const column of columns) {
    runSqlite(`ALTER TABLE site ADD COLUMN ${column} text;`);
  }
}

ensureSqliteSocialLinksTable();
ensureSqliteAboutPageSchema();
ensureSqliteFooterCertificateSchema();

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Projeto Nexo",
      icons: [
        {
          rel: "icon",
          type: "image/svg+xml",
          url: "/assets/projeto-nexo-mark.svg",
        },
      ],
    },
    components: {
      graphics: {
        Logo: "/components/payload/Logo.tsx",
        Icon: "/components/payload/Icon.tsx",
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.js"),
    },
  },
  collections: [Users, Media, Services, Posts],
  globals: [Site, About, ServicesPage, Gallery, Contact],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "UNSAFE_LOCAL_DEV_SECRET",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresUrl
    ? vercelPostgresAdapter({
        pool: {
          connectionString: postgresUrl,
        },
        migrationDir: path.resolve(dirname, "migrations"),
        prodMigrations: migrations,
        push: false,
      })
    : sqliteAdapter({
        client: {
          url: process.env.SQLITE_URL || "file:./payload.sqlite",
        },
        push: false,
      }),
  sharp,
  plugins: process.env.BLOB_READ_WRITE_TOKEN
    ? [
        vercelBlobStorage({
          collections: {
            media: true,
          },
          token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
      ]
    : [],
  async onInit(payload) {
    try {
      ensureSqliteSocialLinksTable();
      ensureSqliteAboutPageSchema();
      ensureSqliteFooterCertificateSchema();
      const existing = await payload.find({
        collection: "services",
        limit: 1,
        overrideAccess: true,
      });
      if (existing.totalDocs === 0) {
        for (const service of DEFAULT_SERVICES) {
          await payload.create({
            collection: "services",
            data: { ...service },
            overrideAccess: true,
          });
        }
      }

      const about = await payload.findGlobal({
        slug: "about",
        overrideAccess: true,
      });
      const aboutPhotos = about.placeholders as
        | { imageUrl?: string | null }[]
        | null
        | undefined;
      const aboutRecord = about as typeof about & Partial<typeof DEFAULT_ABOUT>;
      if (!about.heading) {
        await payload.updateGlobal({
          slug: "about",
          data: DEFAULT_ABOUT,
          overrideAccess: true,
        });
      } else {
        const patch: Record<string, unknown> = {};
        if (!aboutPhotos?.[0]?.imageUrl) {
          patch.placeholders = DEFAULT_ABOUT.placeholders;
        }
        if (!aboutRecord.heroLead) {
          patch.heroEyebrow = DEFAULT_ABOUT.heroEyebrow;
          patch.heroLead = DEFAULT_ABOUT.heroLead;
          patch.heroImageUrl = DEFAULT_ABOUT.heroImageUrl;
          patch.heroImageAlt = DEFAULT_ABOUT.heroImageAlt;
          patch.storyTitle = DEFAULT_ABOUT.storyTitle;
          patch.valuesEyebrow = DEFAULT_ABOUT.valuesEyebrow;
          patch.valuesTitle = DEFAULT_ABOUT.valuesTitle;
          patch.valuesIntro = DEFAULT_ABOUT.valuesIntro;
          patch.values = DEFAULT_ABOUT.values;
          patch.ctaTitle = DEFAULT_ABOUT.ctaTitle;
          patch.ctaBody = DEFAULT_ABOUT.ctaBody;
          patch.ctaLabel = DEFAULT_ABOUT.ctaLabel;
          patch.ctaHref = DEFAULT_ABOUT.ctaHref;
          patch.ctaWhatsappLabel = DEFAULT_ABOUT.ctaWhatsappLabel;
          patch.seoTitle = DEFAULT_ABOUT.seoTitle;
          patch.seoDescription = DEFAULT_ABOUT.seoDescription;
        } else if (!aboutRecord.values?.length) {
          patch.values = DEFAULT_ABOUT.values;
        }
        if (Object.keys(patch).length > 0) {
          await payload.updateGlobal({
            slug: "about",
            data: patch,
            overrideAccess: true,
          });
        }
      }

      const servicesPage = await payload.findGlobal({
        slug: "servicesPage",
        overrideAccess: true,
      });
      if (!servicesPage.heading) {
        await payload.updateGlobal({
          slug: "servicesPage",
          data: DEFAULT_SERVICES_PAGE,
          overrideAccess: true,
        });
      }

      const gallery = await payload.findGlobal({
        slug: "gallery",
        overrideAccess: true,
      });
      if (!gallery.projects?.length || gallery.projects.length < 4) {
        await payload.updateGlobal({
          slug: "gallery",
          data: {
            heading: DEFAULT_GALLERY.heading,
            intro: DEFAULT_GALLERY.intro,
            environmentsHeading: DEFAULT_GALLERY.environmentsHeading,
            environmentsIntro: DEFAULT_GALLERY.environmentsIntro,
            contactCta: DEFAULT_GALLERY.contactCta,
            mosaicContact: DEFAULT_GALLERY.mosaicContact,
            mosaicWork: DEFAULT_GALLERY.mosaicWork,
            projects: DEFAULT_GALLERY.projects.map((project) => ({
              title: project.title,
              titleLines: project.titleLines?.map((line) => ({ line })),
              caption: project.caption,
              isRealWork: Boolean(project.isRealWork),
              imageUrl: project.imageUrl,
              alt: project.alt,
              width: project.width,
              height: project.height,
              fit: project.fit,
              panels: project.panels,
            })),
          },
          overrideAccess: true,
        });
      } else {
        const hasRealWork = gallery.projects.some((project) => {
          const row = project as {
            isRealWork?: boolean | null;
            panels?: unknown[] | null;
          };
          return Boolean(row.isRealWork) || Boolean(row.panels?.length);
        });
        if (!hasRealWork) {
          await payload.updateGlobal({
            slug: "gallery",
            data: {
              projects: gallery.projects.map((project) => {
                const fallback =
                  DEFAULT_GALLERY.projects.find(
                    (item) =>
                      item.title === project.title ||
                      item.imageUrl ===
                        (project as { imageUrl?: string | null }).imageUrl,
                  ) ?? DEFAULT_GALLERY.projects[0];
                const image =
                  project.image && typeof project.image === "object"
                    ? project.image.id
                    : project.image;
                return {
                  title: project.title,
                  titleLines: fallback.titleLines?.map((line) => ({ line })),
                  caption: project.caption,
                  isRealWork: Boolean(fallback.isRealWork),
                  image,
                  imageUrl: (project as { imageUrl?: string | null }).imageUrl,
                  alt: project.alt,
                  width: project.width,
                  height: project.height,
                  fit: project.fit ?? fallback.fit,
                  panels: fallback.panels,
                };
              }),
            },
            overrideAccess: true,
          });
        }
      }

      const contact = await payload.findGlobal({
        slug: "contact",
        overrideAccess: true,
      });
      if (!contact.heading) {
        await payload.updateGlobal({
          slug: "contact",
          data: DEFAULT_CONTACT,
          overrideAccess: true,
        });
      }

      const site = await payload.findGlobal({
        slug: "site",
        overrideAccess: true,
      });
      const firstHeroAlt = site.heroSlides?.[0]?.alt ?? "";
      if (!site.name) {
        await payload.updateGlobal({
          slug: "site",
          data: DEFAULT_SITE,
          overrideAccess: true,
        });
      } else if (firstHeroAlt.includes("temporária")) {
        await payload.updateGlobal({
          slug: "site",
          data: { heroSlides: DEFAULT_SITE.heroSlides },
          overrideAccess: true,
        });
      }

      const navNeedsSobrePage = site.nav?.some((item) => item.href === "/#sobre");
      if (site.name && navNeedsSobrePage) {
        await payload.updateGlobal({
          slug: "site",
          data: {
            nav: site.nav?.map((item) => ({
              ...item,
              href: item.href === "/#sobre" ? "/sobre" : item.href,
            })),
          },
          overrideAccess: true,
        });
      }

      const siteWithBlog = site as { blogHeading?: string | null };
      if (site.name && !siteWithBlog.blogHeading) {
        await payload.updateGlobal({
          slug: "site",
          data: {
            blogHeading: DEFAULT_SITE.blogHeading,
            blogHeadingHighlight: DEFAULT_SITE.blogHeadingHighlight,
            blogIntro: DEFAULT_SITE.blogIntro,
            blogAllCta: DEFAULT_SITE.blogAllCta,
            blogReadCta: DEFAULT_SITE.blogReadCta,
            blogEmptyTitle: DEFAULT_SITE.blogEmptyTitle,
            blogEmptyBody: DEFAULT_SITE.blogEmptyBody,
            blogEmptyAside: DEFAULT_SITE.blogEmptyAside,
            blogEmptyCta: DEFAULT_SITE.blogEmptyCta,
            blogPageIntro: DEFAULT_SITE.blogPageIntro,
            blogPageEmptyTitle: DEFAULT_SITE.blogPageEmptyTitle,
            blogPageEmptyBody: DEFAULT_SITE.blogPageEmptyBody,
            blogPageEmptyAside: DEFAULT_SITE.blogPageEmptyAside,
            footerContactsHeading: DEFAULT_SITE.footerContactsHeading,
            footerContactRequestLabel: DEFAULT_SITE.footerContactRequestLabel,
            footerWhatsappPrefix: DEFAULT_SITE.footerWhatsappPrefix,
            footerPhonePrefix: DEFAULT_SITE.footerPhonePrefix,
            footerEmailPrefix: DEFAULT_SITE.footerEmailPrefix,
            footerBlogLabel: DEFAULT_SITE.footerBlogLabel,
            footerServicesHeading: DEFAULT_SITE.footerServicesHeading,
            footerRepairsLabel: DEFAULT_SITE.footerRepairsLabel,
            footerGuaranteesHeading: DEFAULT_SITE.footerGuaranteesHeading,
            footerCopyright: DEFAULT_SITE.footerCopyright,
            termsHeading: DEFAULT_SITE.termsHeading,
            termsParagraphs: DEFAULT_SITE.termsParagraphs,
            methodPhotoUrl: DEFAULT_SITE.methodImage.src,
            methodPhotoAlt: DEFAULT_SITE.methodImage.alt,
          },
          overrideAccess: true,
        });
      }

      const siteWithSocial = site as { socialLinks?: unknown[] | null };
      if (
        site.name &&
        (!Array.isArray(siteWithSocial.socialLinks) ||
          siteWithSocial.socialLinks.length === 0)
      ) {
        await payload.updateGlobal({
          slug: "site",
          data: { socialLinks: DEFAULT_SITE.socialLinks },
          overrideAccess: true,
        });
      }

      const siteWithCertificate = site as {
        footerCertificateHeading?: string | null;
        footerAlsoDoTitle?: string | null;
      };
      if (site.name && !siteWithCertificate.footerCertificateHeading) {
        await payload.updateGlobal({
          slug: "site",
          data: {
            footerCertificateHeading: DEFAULT_SITE.footerCertificateHeading,
            footerCertificateIssuer: DEFAULT_SITE.footerCertificateIssuer,
            footerCertificateCompany: DEFAULT_SITE.footerCertificateCompany,
            footerCertificateNipc: DEFAULT_SITE.footerCertificateNipc,
            footerCertificateAlvara: DEFAULT_SITE.footerCertificateAlvara,
            footerAlsoDoTitle: DEFAULT_SITE.footerAlsoDoTitle,
            footerAlsoDoBody: DEFAULT_SITE.footerAlsoDoBody,
          },
          overrideAccess: true,
        });
      } else if (site.name && !siteWithCertificate.footerAlsoDoTitle) {
        await payload.updateGlobal({
          slug: "site",
          data: {
            footerAlsoDoTitle: DEFAULT_SITE.footerAlsoDoTitle,
            footerAlsoDoBody: DEFAULT_SITE.footerAlsoDoBody,
          },
          overrideAccess: true,
        });
      }

      const galleryWithIntro = gallery as { intro?: string | null };
      if (!galleryWithIntro.intro) {
        await payload.updateGlobal({
          slug: "gallery",
          data: {
            intro: DEFAULT_GALLERY.intro,
            environmentsHeading: DEFAULT_GALLERY.environmentsHeading,
            environmentsIntro: DEFAULT_GALLERY.environmentsIntro,
            contactCta: DEFAULT_GALLERY.contactCta,
            mosaicContact: DEFAULT_GALLERY.mosaicContact,
            mosaicWork: DEFAULT_GALLERY.mosaicWork,
          },
          overrideAccess: true,
        });
      }

      if (
        !(servicesPage as { serviceWhatsappCta?: string | null }).serviceWhatsappCta
      ) {
        await payload.updateGlobal({
          slug: "servicesPage",
          data: { serviceWhatsappCta: DEFAULT_SERVICES_PAGE.serviceWhatsappCta },
          overrideAccess: true,
        });
      }

      const catalog = await payload.find({
        collection: "services",
        limit: 100,
        depth: 0,
        overrideAccess: true,
      });
      const bySlug = new Map(
        catalog.docs.map((doc) => [String(doc.slug ?? ""), doc]),
      );
      for (const service of DEFAULT_SERVICES) {
        const current = bySlug.get(service.slug);
        const photo = SERVICE_PHOTOS[service.slug];
        if (!current) {
          await payload.create({
            collection: "services",
            data: {
              ...service,
              ...(photo
                ? { imageUrl: photo.src, imageAlt: photo.alt }
                : {}),
            },
            overrideAccess: true,
          });
          continue;
        }
        if (Boolean(current.inFooter) !== service.inFooter) {
          await payload.update({
            collection: "services",
            id: current.id,
            data: { inFooter: service.inFooter },
            overrideAccess: true,
          });
        }
      }

      const catalogWithPhotos = await payload.find({
        collection: "services",
        limit: 100,
        depth: 0,
        overrideAccess: true,
      });
      for (const service of catalogWithPhotos.docs) {
        const photo = SERVICE_PHOTOS[String(service.slug ?? "")];
        const currentUrl = (service as { imageUrl?: string | null }).imageUrl;
        if (!photo || currentUrl) continue;
        await payload.update({
          collection: "services",
          id: service.id,
          data: {
            imageUrl: photo.src,
            imageAlt: photo.alt,
          },
          overrideAccess: true,
        });
      }
    } catch (error) {
      payload.logger.error({ err: error }, "CMS seed failed");
    }
  },
});
