import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { products } from "@/lib/products";
import { projects } from "@/lib/portfolio";
import { apps } from "@/lib/apps";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://approtic.in";
  const now = new Date();

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.8 },
    { url: `${base}/support`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const blogPages = getAllPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productPages = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const portfolioPages = projects.map((p) => ({
    url: `${base}/portfolio/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const appPages = apps.flatMap((a) => [
    { url: `${base}/apps/${a.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${base}/apps/${a.slug}/privacy`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${base}/apps/${a.slug}/terms`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.4 },
  ]);

  return [...staticPages, ...blogPages, ...productPages, ...portfolioPages, ...appPages];
}
