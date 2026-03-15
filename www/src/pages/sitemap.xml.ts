import { Context } from "hono";
import { SitemapUrl, generateSitemap } from "../utils/sitemap.ts";
import { readdir, readFile } from "node:fs/promises";
import matter from "gray-matter";
import path from "node:path";

export default async function SitemapXml(c: Context) {
  // Get the base URL without the /sitemap.xml
  const baseUrl = `${c.req.url.split('/sitemap.xml')[0]}`;
  const urls: SitemapUrl[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/docs`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.9
    }
  ];

  try {
    const entries = await readdir("./src/content/docs", { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        const slug = entry.name.replace(".md", "");
        const content = await readFile(path.join("./src/content/docs", entry.name), "utf-8");
        const { data: attrs } = matter(content);
        urls.push({
          loc: `${baseUrl}/docs/${slug}`,
          lastmod: attrs.publishedAt ? new Date(attrs.publishedAt).toISOString() : new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.8
        });
      }
    }
  } catch (e) {
    // Ignore if docs don't exist
  }

  const sitemap = generateSitemap(urls);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}