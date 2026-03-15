import { glob } from "glob";
import { readFile, writeFile } from "node:fs/promises";

async function concatenateMarkdownFiles() {
  const docsDir = "./src/content/docs";
  let concatenatedContent = "";

  // Get all markdown files in the docs directory
  const files = await glob("**/*.md", { cwd: docsDir });

  for (const file of files) {
    // Read the content of each markdown file
    const content = await readFile(`${docsDir}/${file}`, "utf-8");
    concatenatedContent += content + "\n\n";
  }

  // Write the concatenated content to the output file
  await writeFile("./src/static/llms.txt", concatenatedContent, "utf-8");
}

export async function generateLLMs() {
  await concatenateMarkdownFiles();
  console.log("Generated LLMs ✅");
}
