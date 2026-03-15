import Layout from "../layouts/BaseLayout.tsx";
import { ShowcaseSite, showcaseSites } from "../content/showcase/index.ts";
import Hero from "../components/Hero.tsx";
import { Fragment, jsx } from "hono/jsx";
import { BaseHead } from "../components/BaseHead.ts";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function ShowcaseGrid() {
  const shuffledSites = shuffleArray(showcaseSites);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {shuffledSites.map((site) => <ShowcaseCard key={site.title} site={site} />)}
    </div>
  );
}

function ShowcaseCard({ site }: { site: ShowcaseSite }) {
  const imageBasePath = site.image.replace(".png", "");

  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-background hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
    >
      <iconify-icon
        icon="material-symbols:north-east"
        class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110 transition-all duration-300 ease-out text-white bg-gray-900/80 dark:bg-gray-800 p-2 rounded-full"
        width="20"
        height="20"
      ></iconify-icon>
      <div
        className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800"
      >
        <picture>
          {/* Large viewport */}
          <source
            media="(min-width: 1024px)"
            srcSet={`${imageBasePath}-lg.avif`}
            type="image/avif"
          />
          {/* Medium viewport */}
          <source
            media="(min-width: 640px)"
            srcSet={`${imageBasePath}-md.avif`}
            type="image/avif"
          />
          {/* Small viewport */}
          <source srcSet={`${imageBasePath}-sm.avif`} type="image/avif" />
          {/* Fallback image */}
          <img
            src={site.image}
            alt={site.title}
            className="h-full w-full object-cover object-center"
            width="600"
            height="400"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3
            className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors truncate max-w-[200px]"
          >
            {site.title}
          </h3>
          <div className="flex gap-2">
            {site.tags.map(
              (tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-gray-50 dark:bg-gray-800/50 px-1.5 py-0.5 text-[11px] font-medium text-gray-500 dark:text-gray-400 ring-1 ring-inset ring-gray-200 dark:ring-gray-700"
                >{tag}</span>
              )
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

export default async function Showcase() {
  const title = "Showcase - Sapling Sites";
  const description = "Discover websites and applications built with the Sapling framework.";
  const canonical = "https://sapling.land/showcase";

  return (
    <Layout
      title={title}
      description={description}
      head={BaseHead({
      title: title,
      description: description,
      canonical: canonical,
    })}
    >
      <Fragment>
        <Hero
          title="Built with Sapling"
          description="Discover websites and applications built with the Sapling framework."
        />
        <div className="py-16">
          <div className="max-w-6xl mx-auto px-8">{<ShowcaseGrid />}</div>
        </div>
      </Fragment>
    </Layout>
  );
}
