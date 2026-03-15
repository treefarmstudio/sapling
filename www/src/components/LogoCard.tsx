import { Button } from "./Button.tsx";

export function LogoCard({
  src,
  title,
  description,
  href,
  svgCode,
}: {
  src: string;
  title: string;
  description: string;
  href: string;
  svgCode?: string;
}) {
  const scriptContent = `
document.addEventListener("DOMContentLoaded", () => {
  const copyButtons = document.querySelectorAll("[data-copy-svg]");
  copyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const code = button.getAttribute("data-copy-svg");
      if (!code) return;

      navigator.clipboard.writeText(code).then(() => {
        const icon = button.querySelector("iconify-icon");
        const text = button.querySelector("span");
        if (!icon || !text) return;

        // Add success state
        icon.setAttribute("icon", "material-symbols:check");
        icon.style.transform = "scale(1.2)";
        text.textContent = "Copied";

        // Reset after 1.5 seconds
        setTimeout(() => {
          icon.setAttribute("icon", "ic:baseline-content-copy");
          icon.style.transform = "scale(1)";
          text.textContent = "Copy SVG";
        }, 1500);
      });
    });
  });
});
`;

  return (
    <div class="flex flex-col shadow-sm border border-gray-200 rounded-lg p-4">
      <img
        width="701"
        height="368"
        src={src}
        alt={title}
        class="w-full h-auto mb-4"
      />
      <div class="flex flex-col py-2">
        <h3 class="text-2xl font-bold">{title}</h3>
        <p class="text-gray-500">{description}</p>
      </div>
      <div class="flex gap-2">
        <Button
          href={href}
          inline
          trailingIcon="material-symbols:download"
        >
          Download
        </Button>
        {svgCode && (
          <sapling-island>
            <template>
              <script dangerouslySetInnerHTML={{ __html: scriptContent }}></script>
            </template>
            <button
              type="button"
              data-copy-svg={svgCode}
              class="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-200"
              title="Copy SVG code"
            >
              <iconify-icon
                icon="ic:baseline-content-copy"
                class="transition-transform duration-200"
                style={{ fontSize: '20px' }}
              ></iconify-icon>
              <span class="font-medium">Copy SVG</span>
            </button>
          </sapling-island>
        )}
      </div>
    </div>
  );
}
