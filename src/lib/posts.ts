import type { Post, PostMeta } from "../types/blog";

const modules = import.meta.glob("../posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    data[key] = val;
  }
  return { data, content: match[2] };
}

function parseTags(raw: string): string[] {
  const m = raw.match(/^\[(.+)]$/);
  if (!m) return raw ? [raw] : [];
  return m[1].split(",").map((t) => t.trim());
}

function toPost(raw: string): Post {
  const { data, content } = parseFrontmatter(raw);
  return {
    title: data.title ?? "",
    date: data.date ?? "",
    slug: data.slug ?? "",
    tags: parseTags(data.tags ?? ""),
    excerpt: data.excerpt ?? "",
    content,
  };
}

const posts: Post[] = Object.values(modules)
  .map(toPost)
  .sort((a, b) => b.date.localeCompare(a.date));

export const allPostMetas: PostMeta[] = posts.map(({ content: _, ...meta }) => meta);

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
