import { glob } from "glob";
import matter from "gray-matter";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";

interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  headings: { text: string; level: number }[];
}

// Add interface for frontmatter
interface Frontmatter {
  title?: string;
  description?: string;
}

export async function generateSearchIndex() {
  const searchIndex: DocEntry[] = [];

  // Resolve paths relative to project root
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const projectRoot = join(scriptDir, "..");
  const docsDir = join(projectRoot, "src", "content", "docs");

  try {
    const files = await glob("**/*.md", { cwd: docsDir });

    for (const file of files) {
      const filePath = join(docsDir, file);
      const content = await readFile(filePath, "utf-8");
      const { frontmatter, markdown } = parseFrontmatter(content);

      // Get filename without extension as slug
      const slug = file.replace(".md", "");

      // Extract headings
      const headings = extractHeadings(markdown);

      // Remove markdown syntax for searchable content
      const plainContent = removeMarkdown(markdown);

      searchIndex.push({
        slug,
        title: frontmatter.title || "",
        description: frontmatter.description || "",
        content: plainContent,
        headings,
      });
    }

    await writeFile(
      join(projectRoot, "src", "static", "search-index.json"),
      JSON.stringify(searchIndex, null, 2),
      "utf-8"
    );

    console.log("Search index generated ✅");
  } catch (error) {
    console.error("Failed to generate search index ❌", error);
    process.exit(1);
  }
}

function parseFrontmatter(content: string): {
  frontmatter: Frontmatter;
  markdown: string;
} {
  const { data: attrs, content: body } = matter(content);
  return { frontmatter: attrs as Frontmatter, markdown: body };
}

function extractHeadings(markdown: string) {
  const headingRegex = /^(#{1,6})\s+(.+?)(?:\n|$)/gm;
  const headings: { text: string; level: number }[] = [];

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const text = match[2]
      .replace(/[#*_~`]/g, "") // Remove markdown formatting
      .replace(/\{#[\w-]+\}/g, "") // Remove heading IDs if present
      .trim();

    if (text.length > 0) {
      headings.push({
        level: match[1].length,
        text: text,
      });
    }
  }

  return headings;
}

function removeMarkdown(markdown: string) {
  return (
    markdown
      // Remove code blocks but keep a placeholder
      .replace(/```[\s\S]*?```/g, "[code block]")
      // Remove inline code but keep content
      .replace(/`([^`]+)`/g, "$1")
      // Replace links with just text
      .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
      // Remove images
      .replace(/!\[([^\]]*)\]\(.*?\)/g, "")
      // Remove HTML tags but keep content
      .replace(/<[^>]+>/g, "")
      // Remove emphasis markers but keep content
      .replace(/[*_~]/g, "")
      // Replace multiple newlines with single space
      .replace(/\n\s*\n/g, " ")
      // Replace remaining newlines with spaces
      .replace(/\n/g, " ")
      // Remove multiple spaces
      .replace(/\s+/g, " ")
      .trim()
  );
}
