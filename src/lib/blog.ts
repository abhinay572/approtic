// Blog data loaded from a build-time generated JSON (see scripts/gen-blog.mjs).
// No filesystem reads at runtime, so it works on Cloudflare Workers.
import generated from "@/content/blog.generated.json";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover?: string;
  tags: string[];
  readingTime: string;
}

interface StoredPost extends PostMeta {
  content: string;
  html: string;
}

const posts = generated as unknown as StoredPost[];

export function getAllPosts(): PostMeta[] {
  return posts
    .map(({ content: _content, html: _html, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): { meta: PostMeta; content: string; html: string } | null {
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  const { content, html, ...meta } = post;
  return { meta, content, html };
}
