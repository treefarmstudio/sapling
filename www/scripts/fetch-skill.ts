import { writeFile } from "node:fs/promises";

export async function fetchSkill() {
  const url =
    "https://raw.githubusercontent.com/treefarmstudio/sapling/main/skills/sapling-island/SKILL.md";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch skill: ${response.statusText}`);
    }
    const skillContent = await response.text();

    // 1. Write the raw skill for download
    await writeFile("./src/static/SKILL.md", skillContent, "utf-8");

    console.log("Fetched and generated AI Skill ✅");
  } catch (error) {
    console.error("Error fetching skill:", error);
  }
}
