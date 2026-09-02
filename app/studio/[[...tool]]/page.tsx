"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

const isConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";

export default function StudioPage() {
  if (!isConfigured) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-[#1A1815]">
        <p className="text-sm uppercase tracking-[0.2em] text-[#B08D4F]">
          Sanity Studio
        </p>
        <h1 className="mt-3 text-3xl">CMS ainda não configurado</h1>
        <p className="mt-4 text-sm leading-relaxed text-black/70">
          Crie um projeto em sanity.io, copie o Project ID para
          NEXT_PUBLIC_SANITY_PROJECT_ID e volte a esta página. O schema de
          artigo (título, slug, capa, corpo, data, categoria) já está no
          repositório.
        </p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
