import { groq } from "next-sanity";
import { isSanityConfigured, sanityClient } from "./client";

export type BlogPost = {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  coverUrl?: string;
  body?: unknown[];
};

const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  "coverUrl": cover.asset->url,
  body
}`;

export async function getLatestPosts(limit = 3): Promise<BlogPost[]> {
  if (!sanityClient || !isSanityConfigured) {
    return [];
  }

  try {
    const posts = await sanityClient.fetch<BlogPost[]>(postsQuery);
    return posts.slice(0, limit);
  } catch (error) {
    console.error("Failed to load Sanity posts", error);
    return [];
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!sanityClient || !isSanityConfigured) {
    return [];
  }

  try {
    return await sanityClient.fetch<BlogPost[]>(postsQuery);
  } catch (error) {
    console.error("Failed to load Sanity posts", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!sanityClient || !isSanityConfigured) {
    return null;
  }

  try {
    const post = await sanityClient.fetch<BlogPost | null>(
      groq`*[_type == "post" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        excerpt,
        category,
        publishedAt,
        "coverUrl": cover.asset->url,
        body
      }`,
      { slug },
    );
    return post;
  } catch (error) {
    console.error("Failed to load Sanity post", error);
    return null;
  }
}
