
interface FeatureGridProps {
  children: any;
}

export default function FeatureGrid({ children }: FeatureGridProps) {
  return (
    <div
      className="mx-auto mt-14 grid w-full max-w-screen-lg grid-cols-2 px-4 max-[900px]:grid-cols-1"
    >
      <div className="contents">
        <div
          className="contents [&>*]:border-gray-200 dark:[&>*]:border-gray-800 [&>*:nth-child(-n+2)]:border-b [&>*:nth-child(2n)]:border-l max-[900px]:divide-y max-[900px]:[&>*:nth-child(-n+2)]:border-b-0 max-[900px]:[&>*:nth-child(2n)]:border-l-0"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function FeatureGridItem({
  children,
  variant,
}: {
  children: any;
  variant?: "dots";
}) {
  const style = {
    "--grid-size": "36px",
    "--mask-start": "0%",
    "--mask-end": "100%",
    "--grid-color": "#e5e5e5",
    backgroundSize: "var(--grid-size) var(--grid-size)",
    backgroundImage: "radial-gradient(circle at center, var(--grid-color) 2px, transparent 2px)",
    maskImage: "linear-gradient(to bottom, white var(--mask-start), transparent var(--mask-end))",
  }

  return (
    <div className="relative flex flex-col gap-10 py-14 sm:px-12">
      {variant === "dots" ? (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-[70%]">
            <div
              className="absolute inset-0"
              style={style}
            ></div>
          </div>
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function FeatureContent({
  title,
  description,
  ctaText,
  ctaHref,
}: {
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <div className="relative flex flex-col">
      <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
        {title}
      </h3>
      <div
        className="mt-2 text-neutral-500 transition-colors [&_a]:font-medium [&_a]:text-neutral-600 [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-2 hover:[&_a]:text-neutral-800"
      >
        <p>{description}</p>
      </div>
      {ctaText && ctaHref ? (
        <a
          className="mt-6 w-fit whitespace-nowrap rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium leading-none text-neutral-900 transition-colors duration-75 outline-none hover:bg-neutral-50 focus-visible:border-neutral-900 focus-visible:ring-1 focus-visible:ring-neutral-900 active:bg-neutral-100"
          href={ctaHref}
        >
          {ctaText}
        </a>
      ) : null}
    </div>
  );
}
