import type { GlobalConfig } from "payload";
import { DEFAULT_SITE, SOCIAL_NETWORKS } from "@/lib/cms/defaults";
import { mediaImageFields } from "./fields";

export const Site: GlobalConfig = {
  slug: "site",
  label: "Geral e restantes secções",
  admin: {
    group: "Secções do site",
    description:
      "Identidade, menu, hero, método, cobertura, FAQ e rodapé. A ordem do menu deve seguir a ordem das secções na homepage.",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Identidade",
          fields: [
            { name: "name", type: "text", label: "Nome", required: true },
            {
              name: "legalName",
              type: "text",
              label: "Designação legal",
              required: true,
            },
            { name: "tagline", type: "textarea", label: "Tagline", required: true },
            { name: "seoDescription", type: "textarea", label: "Descrição SEO" },
            {
              name: "whatsappE164",
              type: "text",
              label: "WhatsApp (só dígitos com indicativo)",
              required: true,
            },
            {
              name: "whatsappDisplay",
              type: "text",
              label: "WhatsApp visível",
              required: true,
            },
            {
              name: "phoneDisplay",
              type: "text",
              label: "Telefone visível",
              required: true,
            },
            {
              name: "phoneTel",
              type: "text",
              label: "Telefone (tel:)",
              required: true,
            },
            {
              name: "contactEmail",
              type: "email",
              label: "E-mail de contacto",
              required: true,
            },
            {
              name: "nexoServicesUrl",
              type: "text",
              label: "URL Nexo Services",
              required: true,
              admin: {
                description:
                  "Destino do logótipo na secção Serviços, do rodapé e do redirecionamento de /reparacoes.",
              },
            },
            {
              name: "nexoServicesLabel",
              type: "text",
              label: "Rótulo Nexo Services",
            },
            {
              name: "whatsappCta",
              type: "text",
              label: "Botão WhatsApp genérico",
              required: true,
            },
            {
              name: "whatsappIntro",
              type: "textarea",
              label: "Introdução da mensagem WhatsApp",
              required: true,
            },
          ],
        },
        {
          label: "Menu",
          fields: [
            {
              name: "nav",
              type: "array",
              label: "Itens do menu",
              minRows: 1,
              admin: {
                description:
                  "A ordem aqui é a ordem no header. Deve coincidir com a ordem das secções na homepage.",
              },
              fields: [
                { name: "label", type: "text", label: "Rótulo", required: true },
                { name: "href", type: "text", label: "Ligação", required: true },
              ],
            },
          ],
        },
        {
          label: "Hero",
          fields: [
            { name: "heroHeading", type: "text", label: "Título (primeira linha)", required: true },
            {
              name: "heroHeadingHighlight",
              type: "text",
              label: "Segunda linha (cor de destaque)",
            },
            { name: "heroLede", type: "textarea", label: "Lede", required: true },
            {
              name: "heroSecondaryCta",
              type: "text",
              label: "Botão secundário",
              required: true,
            },
            {
              name: "heroSecondaryHref",
              type: "text",
              label: "Destino do botão secundário",
              required: true,
            },
            {
              name: "heroSlides",
              type: "array",
              label: "Banners do carrossel",
              minRows: 1,
              fields: [
                ...mediaImageFields({
                  uploadName: "image",
                  urlName: "src",
                  uploadLabel: "Imagem",
                  urlLabel: "URL da imagem (se não carregar Media)",
                }),
                { name: "alt", type: "text", label: "Texto alternativo", required: true },
                { name: "label", type: "text", label: "Rótulo", required: true },
              ],
            },
          ],
        },
        {
          label: "Método",
          fields: [
            {
              name: "methodHeading",
              type: "text",
              label: "Título",
              required: true,
            },
            ...mediaImageFields({
              uploadName: "methodPhoto",
              urlName: "methodPhotoUrl",
              altName: "methodPhotoAlt",
              uploadLabel: "Imagem",
              altLabel: "Texto alternativo da imagem",
            }),
            {
              name: "methodSteps",
              type: "array",
              label: "Passos",
              minRows: 1,
              fields: [
                { name: "title", type: "text", label: "Título", required: true },
                { name: "body", type: "textarea", label: "Texto", required: true },
              ],
            },
          ],
        },
        {
          label: "Cobertura",
          fields: [
            {
              name: "coverageHeading",
              type: "text",
              label: "Título (primeira linha)",
              required: true,
            },
            {
              name: "coverageHighlight",
              type: "text",
              label: "Palavra em destaque no título",
            },
            {
              name: "coverageSubheading",
              type: "text",
              label: "Segunda linha",
            },
            {
              name: "coverageSubheadingHighlight",
              type: "text",
              label: "Palavras em destaque na segunda linha",
            },
            {
              name: "coverageBody",
              type: "textarea",
              label: "Texto",
              required: true,
            },
            {
              name: "coverageRegions",
              type: "array",
              label: "Regiões",
              fields: [
                { name: "label", type: "text", label: "Nome", required: true },
              ],
            },
            {
              name: "coverageMapLabel",
              type: "text",
              label: "Rótulo do mapa",
              required: true,
            },
            {
              name: "coverageMapsCta",
              type: "text",
              label: "Ligação Maps",
              required: true,
            },
            {
              name: "mapsEmbedUrl",
              type: "text",
              label: "URL do iframe Maps",
            },
            { name: "mapsLink", type: "text", label: "URL Abrir no Maps" },
          ],
        },
        {
          label: "Blog",
          fields: [
            {
              name: "blogHeading",
              type: "text",
              label: "Título",
              defaultValue: DEFAULT_SITE.blogHeading,
            },
            {
              name: "blogHeadingHighlight",
              type: "text",
              label: "Palavra em destaque no título",
              defaultValue: DEFAULT_SITE.blogHeadingHighlight,
            },
            {
              name: "blogIntro",
              type: "textarea",
              label: "Introdução na homepage",
              defaultValue: DEFAULT_SITE.blogIntro,
            },
            {
              name: "blogAllCta",
              type: "text",
              label: "Botão ver todas",
              defaultValue: DEFAULT_SITE.blogAllCta,
            },
            {
              name: "blogReadCta",
              type: "text",
              label: "Ligação ler artigo",
              defaultValue: DEFAULT_SITE.blogReadCta,
            },
            {
              name: "blogEmptyTitle",
              type: "text",
              label: "Título vazio (homepage)",
              defaultValue: DEFAULT_SITE.blogEmptyTitle,
            },
            {
              name: "blogEmptyBody",
              type: "textarea",
              label: "Texto vazio (homepage)",
              defaultValue: DEFAULT_SITE.blogEmptyBody,
            },
            {
              name: "blogEmptyAside",
              type: "textarea",
              label: "Texto lateral vazio (homepage)",
              defaultValue: DEFAULT_SITE.blogEmptyAside,
            },
            {
              name: "blogEmptyCta",
              type: "text",
              label: "Botão vazio",
              defaultValue: DEFAULT_SITE.blogEmptyCta,
            },
            {
              name: "blogPageIntro",
              type: "textarea",
              label: "Introdução da página /blog",
              defaultValue: DEFAULT_SITE.blogPageIntro,
            },
            {
              name: "blogPageEmptyTitle",
              type: "text",
              label: "Título vazio (/blog)",
              defaultValue: DEFAULT_SITE.blogPageEmptyTitle,
            },
            {
              name: "blogPageEmptyBody",
              type: "textarea",
              label: "Texto vazio (/blog)",
              defaultValue: DEFAULT_SITE.blogPageEmptyBody,
            },
            {
              name: "blogPageEmptyAside",
              type: "textarea",
              label: "Texto lateral vazio (/blog)",
              defaultValue: DEFAULT_SITE.blogPageEmptyAside,
            },
          ],
        },
        {
          label: "FAQ",
          fields: [
            { name: "faqHeading", type: "text", label: "Título", required: true },
            {
              name: "faqHeadingHighlight",
              type: "text",
              label: "Palavra em destaque",
            },
            { name: "faqIntro", type: "textarea", label: "Introdução", required: true },
            {
              name: "faqPolicyHeading",
              type: "text",
              label: "Título da política",
              required: true,
            },
            {
              name: "faqPolicyItems",
              type: "array",
              label: "Pontos da política",
              fields: [
                { name: "text", type: "textarea", label: "Texto", required: true },
              ],
            },
            {
              name: "faqs",
              type: "array",
              label: "Perguntas",
              fields: [
                {
                  name: "question",
                  type: "text",
                  label: "Pergunta",
                  required: true,
                },
                {
                  name: "answer",
                  type: "textarea",
                  label: "Resposta",
                  required: true,
                },
              ],
            },
            {
              name: "faqWhatsappCta",
              type: "text",
              label: "Botão WhatsApp da FAQ",
              required: true,
            },
          ],
        },
        {
          label: "Rodapé",
          fields: [
            {
              name: "footerIntro",
              type: "textarea",
              label: "Texto sob o logótipo",
              required: true,
            },
            {
              name: "footerGuarantees",
              type: "textarea",
              label: "Texto de garantias",
              required: true,
            },
            {
              name: "footerGuaranteesCta",
              type: "text",
              label: "Ligação para a FAQ",
              required: true,
            },
            {
              name: "footerNexoLabel",
              type: "text",
              label: "Ligação Nexo Services no rodapé",
              required: true,
            },
            {
              name: "locationLine",
              type: "text",
              label: "Linha de localização",
              required: true,
            },
            {
              name: "footerContactsHeading",
              type: "text",
              label: "Título Contactos",
              defaultValue: DEFAULT_SITE.footerContactsHeading,
            },
            {
              name: "footerContactRequestLabel",
              type: "text",
              label: "Ligação pedido de contacto",
              defaultValue: DEFAULT_SITE.footerContactRequestLabel,
            },
            {
              name: "footerWhatsappPrefix",
              type: "text",
              label: "Rótulo WhatsApp",
              defaultValue: DEFAULT_SITE.footerWhatsappPrefix,
            },
            {
              name: "footerPhonePrefix",
              type: "text",
              label: "Rótulo telefone",
              defaultValue: DEFAULT_SITE.footerPhonePrefix,
            },
            {
              name: "footerEmailPrefix",
              type: "text",
              label: "Rótulo e-mail",
              defaultValue: DEFAULT_SITE.footerEmailPrefix,
            },
            {
              name: "footerBlogLabel",
              type: "text",
              label: "Ligação blog",
              defaultValue: DEFAULT_SITE.footerBlogLabel,
            },
            {
              name: "footerServicesHeading",
              type: "text",
              label: "Título Serviços",
              defaultValue: DEFAULT_SITE.footerServicesHeading,
            },
            {
              name: "footerRepairsLabel",
              type: "text",
              label: "Ligação Reparações",
              defaultValue: DEFAULT_SITE.footerRepairsLabel,
            },
            {
              name: "footerGuaranteesHeading",
              type: "text",
              label: "Título Garantias",
              defaultValue: DEFAULT_SITE.footerGuaranteesHeading,
            },
            {
              name: "footerCopyright",
              type: "text",
              label: "Texto de copyright",
              defaultValue: DEFAULT_SITE.footerCopyright,
            },
            {
              name: "socialLinks",
              type: "array",
              label: "Redes sociais",
              labels: {
                singular: "Rede social",
                plural: "Redes sociais",
              },
              admin: {
                description:
                  "O ícone só aparece no rodapé se «Visível no rodapé» estiver activo e o URL estiver preenchido.",
              },
              fields: [
                {
                  name: "network",
                  type: "select",
                  label: "Rede",
                  required: true,
                  options: SOCIAL_NETWORKS.map((network) => ({
                    label: network.label,
                    value: network.value,
                  })),
                },
                {
                  name: "url",
                  type: "text",
                  label: "URL",
                  admin: {
                    description:
                      "URL completo, por exemplo https://www.instagram.com/projetonexo",
                  },
                },
                {
                  name: "enabled",
                  type: "checkbox",
                  label: "Visível no rodapé",
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: "Termos",
          fields: [
            {
              name: "termsHeading",
              type: "text",
              label: "Título",
              defaultValue: DEFAULT_SITE.termsHeading,
            },
            {
              name: "termsParagraphs",
              type: "array",
              label: "Parágrafos",
              minRows: 1,
              fields: [
                {
                  name: "text",
                  type: "textarea",
                  label: "Texto",
                  required: true,
                },
                {
                  name: "linkHref",
                  type: "text",
                  label: "Ligação (opcional)",
            },
                {
                  name: "linkLabel",
                  type: "text",
                  label: "Texto da ligação",
            },
              ],
            },
          ],
        },
      ],
    },
  ],
};
