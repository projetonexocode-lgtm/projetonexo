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
      if (!about.heading) {
        await payload.updateGlobal({
          slug: "about",
          data: DEFAULT_ABOUT,
          overrideAccess: true,
        });
      } else if (!aboutPhotos?.[0]?.imageUrl) {
        await payload.updateGlobal({
          slug: "about",
          data: { placeholders: DEFAULT_ABOUT.placeholders },
          overrideAccess: true,
        });
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
