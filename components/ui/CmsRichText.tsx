import { LinkJSXConverter, RichText } from "@payloadcms/richtext-lexical/react";
import {
  hasRichText,
  isCmsRichText,
  plainTextToRichText,
  type CmsRichTextData,
} from "@/lib/cms/rich-text";

type CmsRichTextProps = {
  value: CmsRichTextData | string | null | undefined;
  className?: string;
  inline?: boolean;
};

function internalHref(linkNode: {
  fields: {
    url?: string | null;
    doc?: {
      relationTo: string;
      value: number | { slug?: string | null; [key: string]: unknown };
    } | null;
  };
}): string {
  const url = linkNode.fields.url;
  if (typeof url === "string" && url.trim()) return url;

  const value = linkNode.fields.doc?.value;
  if (!value || typeof value !== "object" || typeof value.slug !== "string") {
    return "#";
  }
  if (linkNode.fields.doc?.relationTo === "posts") return `/blog/${value.slug}`;
  if (linkNode.fields.doc?.relationTo === "services") return `/servicos/${value.slug}`;
  return "#";
}

export function CmsRichText({ value, className, inline = false }: CmsRichTextProps) {
  const data = typeof value === "string" ? plainTextToRichText(value) : value;
  if (!isCmsRichText(data) || !hasRichText(data)) return null;

  const classes = ["cms-richtext", inline ? "cms-richtext-inline" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <RichText
      className={classes}
      data={data}
      converters={({ defaultConverters }) => ({
        ...defaultConverters,
        ...LinkJSXConverter({
          internalDocToHref: ({ linkNode }) => internalHref(linkNode),
        }),
      })}
    />
  );
}
