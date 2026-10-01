const RICH_TEXT_KEYS = [
  "answer",
  "audiencesIntro",
  "blogEmptyAside",
  "blogEmptyBody",
  "blogIntro",
  "blogPageEmptyAside",
  "blogPageEmptyBody",
  "blogPageIntro",
  "body",
  "caption",
  "consent",
  "coverageBody",
  "ctaBody",
  "description",
  "environmentsIntro",
  "fallbackBody",
  "faqIntro",
  "footerAlsoDoBody",
  "footerGuarantees",
  "footerIntro",
  "heroLead",
  "heroLede",
  "intro",
  "missionBody",
  "nexoBody",
  "processIntro",
  "successMessage",
  "text",
  "valuesIntro",
] as const;

const RICH_TEXT_KEY_SET = new Set<string>(RICH_TEXT_KEYS);

type RichTextNode = {
  type: string;
  version: number;
  children?: RichTextNode[];
  text?: string;
  [key: string]: unknown;
};

export type CmsRichTextData = {
  root: {
    type: string;
    children: RichTextNode[];
    direction: "ltr" | "rtl" | null;
    format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
    indent: number;
    version: number;
  };
};

type RichTextKey = (typeof RICH_TEXT_KEYS)[number];

export type Richify<T> = T extends readonly (infer Item)[]
  ? Richify<Item>[]
  : T extends object
    ? { [K in keyof T]: K extends RichTextKey ? CmsRichTextData : Richify<T[K]> }
    : T;

function textNode(text: string): RichTextNode {
  return {
    type: "text",
    text,
    detail: 0,
    format: 0,
    mode: "normal",
    style: "",
    version: 1,
  };
}

function paragraphNode(text: string): RichTextNode {
  const lines = text.split("\n");
  const children: RichTextNode[] = [];
  lines.forEach((line, index) => {
    if (index > 0) children.push({ type: "linebreak", version: 1 });
    if (line) children.push(textNode(line));
  });
  if (children.length === 0) children.push(textNode(""));

  return {
    type: "paragraph",
    children,
    direction: "ltr",
    format: "",
    indent: 0,
    version: 1,
    textFormat: 0,
    textStyle: "",
  };
}

export function plainTextToRichText(value: string): CmsRichTextData {
  const blocks = value
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);
  const paragraphs = (blocks.length > 0 ? blocks : [value.trim()]).map(paragraphNode);

  return {
    root: {
      type: "root",
      children: paragraphs,
      direction: "ltr",
      format: "",
      indent: 0,
      version: 1,
    },
  };
}

export function isCmsRichText(value: unknown): value is CmsRichTextData {
  if (!value || typeof value !== "object" || !("root" in value)) return false;
  const root = (value as { root?: { children?: unknown } }).root;
  return Boolean(root && typeof root === "object" && Array.isArray(root.children));
}

function nodeToPlain(node: RichTextNode): string {
  if (typeof node.text === "string") return node.text;
  if (node.type === "linebreak") return "\n";
  const children = Array.isArray(node.children) ? node.children.map(nodeToPlain).join("") : "";
  if (
    node.type === "paragraph" ||
    node.type === "heading" ||
    node.type === "quote" ||
    node.type === "listitem"
  ) {
    return `${children}\n`;
  }
  return children;
}

export function richTextToPlain(value: unknown): string {
  if (typeof value === "string") return value;
  if (!isCmsRichText(value)) return "";
  return value.root.children
    .map(nodeToPlain)
    .join("")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function hasRichText(value: unknown): boolean {
  return richTextToPlain(value).trim().length > 0;
}

export function asRichText(value: unknown, fallback: CmsRichTextData): CmsRichTextData {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("{")) {
      try {
        const parsed: unknown = JSON.parse(trimmed);
        if (isCmsRichText(parsed) && hasRichText(parsed)) return parsed;
      } catch {
        // Plain copy that happens to start with a brace.
      }
    }
    if (trimmed) return plainTextToRichText(value);
    return fallback;
  }

  if (isCmsRichText(value) && hasRichText(value)) return value;
  return fallback;
}

export function optionalRichText(value: unknown): CmsRichTextData | undefined {
  if (value == null) return undefined;
  const rich = asRichText(value, plainTextToRichText(""));
  return hasRichText(rich) ? rich : undefined;
}

export function stripLeadingPlainPrefix(
  value: CmsRichTextData,
  pattern: RegExp,
): CmsRichTextData {
  const next = structuredClone(value);
  const paragraph = next.root.children[0];
  const children = paragraph?.children;
  if (!paragraph || paragraph.type !== "paragraph" || !Array.isArray(children)) {
    return value;
  }
  const first = children.find(
    (child) => child.type === "text" && typeof child.text === "string",
  );
  if (!first?.text || !pattern.test(first.text)) return value;
  first.text = first.text.replace(pattern, "");
  return next;
}

function richifyValue(value: unknown, key?: string): unknown {
  if (typeof value === "string" && key && RICH_TEXT_KEY_SET.has(key)) {
    return plainTextToRichText(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => richifyValue(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([childKey, child]) => [
        childKey,
        richifyValue(child, childKey),
      ]),
    );
  }
  return value;
}

export function richify<T>(value: T): Richify<T> {
  return richifyValue(value) as Richify<T>;
}
