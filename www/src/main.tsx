/** @jsxImportSource hono/jsx */
import "dotenv/config";
import { Hono, Context, Next } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile } from "node:fs/promises";
import Home from "./pages/Home.tsx";
import DocPage from "./pages/DocPage.tsx";
import SitemapXml from "./pages/sitemap.xml.ts";
import Showcase from "./pages/Showcase.tsx";
import NotFoundLayout from "./layouts/NotFoundLayout.tsx";

const isDev = process.env.NODE_ENV === "development";

export const site = new Hono();

// middleware
function cachingHeadersMiddleware(c: Context, next: Next) {
  if (isDev) {
    return next();
  }
  c.res.headers.set(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=86400"
  );
  return next();
}

function staticAssetsMiddleware(c: Context, next: Next) {
  if (isDev) {
    return next();
  }
  c.res.headers.set(
    "Cache-Control",
    "public, max-age=31536000, immutable"
  );
  return next();
}

// Home page
site.get("/", (c: Context) => c.html(<Home />));

// Showcase page
site.get("/showcase", async (c: Context) => {
  return c.html(<Showcase />);
});

site.get("/docs/llms.txt", async (c: Context) => {
  const result = await readFile("./src/static/llms.txt", "utf-8");
  return c.text(result);
});

site.get("/docs", (c: Context) => c.redirect("https://github.com/treefarmstudio/sapling#sapling"));

site.get("/docs/ai-skill", (c: Context) => c.redirect("/SKILL.md"));

// Sitemap
site.get("/sitemap.xml", async (c: Context) => await SitemapXml(c));

// Serve static assets with a special caching header
site.get(
  "/assets/*",
  staticAssetsMiddleware,
  serveStatic({
    root: "./src/static",
  })
);

site.get("/docs/prerendering", (c: Context) => c.redirect("/docs"));

// static assets
site.get(
  "*",
  serveStatic({
    root: "./src/static",
  })
);

// 404 Handler
site.notFound((c: Context) => c.html(<NotFoundLayout />));

const port = Number(process.env.PORT) || 8080;
console.log(`\nSapling Server is running on http://localhost:${port}\n`);

serve({
  fetch: site.fetch,
  port,
});
