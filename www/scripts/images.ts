import { optimizeImages } from "@sapling/image";

optimizeImages({
  entries: [
    {
      input: "src/images/showcase",
      output: "src/static/assets/images/showcase",
    },
  ],
})
  .then(() => console.log("✨ Image optimization complete!"))
  .catch(console.error);
