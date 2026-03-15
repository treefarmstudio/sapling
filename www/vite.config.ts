import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: "clean-old-assets",
      apply: "build",
      async closeBundle() {
        const assetsDir = "src/static/styles";
        try {
          // Read current manifest to know what to keep
          const manifestPath = "src/static/.vite/manifest.json";
          const fs = await import("node:fs/promises");
          const manifestContent = await fs.readFile(manifestPath, "utf-8");
          const manifest = JSON.parse(manifestContent);
          
          const keepFiles = new Set<string>();
          Object.values(manifest).forEach((entry: any) => {
             if (entry.file) {
                 // entry.file is like "main-HASH.css"
                 const filename = entry.file.split('/').pop();
                 if (filename) keepFiles.add(filename);
             }
          });

          // Read assets dir
          const entries = await fs.readdir(assetsDir, { withFileTypes: true });
          for (const entry of entries) {
            // Only target our generated CSS files
            if (entry.isFile() && entry.name.startsWith("main-") && entry.name.endsWith(".css")) {
              if (!keepFiles.has(entry.name)) {
                await fs.unlink(`${assetsDir}/${entry.name}`);
                console.log(`Cleaned up old asset: ${entry.name}`);
              }
            }
          }
        } catch (e) {
          console.error("Error cleaning up old assets:", e);
        }
      }
    }
  ],
  build: {
    manifest: true,
    outDir: "src/static",
    emptyOutDir: false,
    rollupOptions: {
      input: "src/styles/main.css",
      output: {
        assetFileNames: "styles/[name]-[hash][extname]",
      },
    },
    // Only enable watch options if we are actually watching
    watch: process.argv.includes("--watch")
      ? {
          exclude: ["src/static/**"],
        }
      : undefined,
  },
});
