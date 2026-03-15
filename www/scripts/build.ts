import { generateLLMs } from "./generate-llms.ts";
import { generateSearchIndex } from "./generate-search-index.ts";
import { fetchSkill } from "./fetch-skill.ts";

export async function build() {
  await fetchSkill();
  await generateLLMs();
  await generateSearchIndex();
  console.log("Build completed");
  process.exit(0);
}

build().catch(console.error);
