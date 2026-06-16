// Build-time: read src/content/blog/*.mdx and emit a single JSON the app
// imports at runtime. Avoids filesystem reads on Cloudflare Workers.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "src/content/blog");
const OUT = path.join(process.cwd(), "src/content/blog.generated.json");

const posts = (fs.existsSync(DIR) ? fs.readdirSync(DIR) : [])
  .filter((f) => f.endsWith(".mdx"))
  .map((file) => {
    const raw = fs.readFileSync(path.join(DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      description: data.description ?? "",
      cover: data.cover ?? null,
      tags: data.tags ?? [],
      readingTime: readingTime(content).text,
      content,
      html: marked.parse(content, { async: false }),
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

fs.writeFileSync(OUT, JSON.stringify(posts, null, 2));
console.log(`gen-blog: wrote ${posts.length} post(s) to ${path.relative(process.cwd(), OUT)}`);
