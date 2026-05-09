import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  cover?: string;
  tags: string[];
  readingTime: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);
      return {
        slug: file.replace(".mdx", ""),
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? "",
        cover: data.cover,
        tags: data.tags ?? [],
        readingTime: rt.text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): { meta: PostMeta; content: string } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    meta: {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      description: data.description ?? "",
      cover: data.cover,
      tags: data.tags ?? [],
      readingTime: rt.text,
    },
    content,
  };
}
