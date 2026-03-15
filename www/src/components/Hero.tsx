import { Button } from "./Button.tsx";

export default function Hero({
  title,
  description,
  button,
  href,
  useSerif,
}: {
  title: string;
  description: string;
  button?: string;
  href?: string;
  useSerif?: boolean;
}) {
  return (
    <div class="relative min-h-[400px] flex items-center justify-center px-6 pb-4 overflow-hidden">
      {/* Grid Background */}
      <div class="absolute inset-0 w-full h-full">
        <div
          class="absolute inset-0"
          style={{
            "--grid-size": "50px",
            backgroundSize: "var(--grid-size) var(--grid-size)",
            backgroundImage:
              "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
            maskImage: "radial-gradient(circle at center, white 40%, transparent 70%)",
          }}
        ></div>
      </div>
      <div class="text-center max-w-3xl mx-auto py-16 relative">
        <h2
          class={`text-5xl md:text-6xl lg:text-7xl font-semibold ${
            useSerif ? " font-serif italic !font-normal" : "font-heading"
          } mb-6`}
        >
          {title}
        </h2>
        <p class="text-xl mb-8 max-w-xl mx-auto dark:text-gray-300">
          {description}
        </p>
        {button ? (
          <div class="flex gap-4 justify-center flex-col items-center">
            <Button href={href || ""}>{button}</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
