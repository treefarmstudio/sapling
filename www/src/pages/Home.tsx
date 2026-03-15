import Layout from "../layouts/BaseLayout.tsx";
import { DenoIcon } from "../components/DenoIcon.tsx";
import { Button } from "../components/Button.tsx";
import { ScoreCircle } from "../components/ScoreCircle.tsx";
import JsLogo from "../components/icons/JsLogo.tsx";
import TsLogo from "../components/icons/TsLogo.tsx";
import CssLogo from "../components/icons/CssLogo.tsx";
import HtmlLogo from "../components/icons/HtmlLogo.tsx";
import CodePreview from "../components/CodePreview.tsx";
import FeatureGrid, {
  FeatureGridItem,
  FeatureContent,
} from "../components/FeatureGrid.tsx";
import { FaqAccordion } from "../components/FaqAccordion.tsx";
import { FeatureCard } from "../components/FeatureCard.tsx";
import { Particles } from "../components/Particles.tsx";
import { LogoMarquee } from "../components/LogoMarquee.tsx";
import { FC } from "hono/jsx";
import { Fragment } from "hono/jsx";

const copyCodeScript = `
class CopyCodeButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = \`
      <style>
        :host { display: inline-flex; }
        button {
          background: none;
          border: none;
          padding: 0;
          margin: 0;
          cursor: pointer;
          color: var(--copy-code-button-foreground, currentColor); /* Use CSS variable */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s;
        }
        button:hover { opacity: 0.7; }
        .icon { display: inline-block; width: 1em; height: 1em; }
        .check { display: none; color: var(--copy-code-button-success-color, #4ade80); } /* Added success color variable */
      </style>
      <button aria-label="Copy code" title="Copy code">
        <svg class="icon copy" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <svg class="icon check" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
    \`;

    const button = this.shadowRoot.querySelector('button');
    button?.addEventListener('click', this.copyCode.bind(this));
  }

  copyCode() {
    // Find the command text relative to the sapling-island containing this button
    const island = this.closest('sapling-island');
    const commandElement = island?.querySelector('#command-text'); // Find the command text element by ID

    if (!commandElement?.textContent) {
      console.error("Could not find command text to copy.");
      return;
    }

    navigator.clipboard.writeText(commandElement.textContent)
      .then(() => this.showSuccess())
      .catch(err => console.error('Failed to copy text: ', err));
  }

  showSuccess() {
    if (!this.shadowRoot) return;
    const copyIcon = this.shadowRoot.querySelector('.icon.copy');
    const checkIcon = this.shadowRoot.querySelector('.icon.check');
    const button = this.shadowRoot.querySelector('button');

    copyIcon?.style.setProperty('display', 'none');
    checkIcon?.style.setProperty('display', 'inline-block');
    button?.setAttribute('aria-label', 'Copied!');

    setTimeout(() => {
      copyIcon?.style.setProperty('display', 'inline-block');
      checkIcon?.style.setProperty('display', 'none');
      button?.setAttribute('aria-label', 'Copy code');
    }, 2000);
  }
}

customElements.define('copy-code-button', CopyCodeButton);
`;


const scoreAnimationScript = `
(async () => {
  const { animate } = await import("https://cdn.jsdelivr.net/npm/motion@latest/+esm");

  // Find all islands containing score circles
  const islands = document.querySelectorAll('sapling-island:has(.score-circle)');

  if (islands.length === 0) {
    return;
  }

  islands.forEach((island, index) => {
    const scores = island.querySelectorAll(".score-value");
    const circles = island.querySelectorAll(".score-circle");

    scores.forEach((score) => {
      if (score instanceof HTMLElement) {
        const targetScore = parseInt(score.dataset.score || '100', 10);
        animate(0, targetScore, {
          duration: 2,
          ease: "circOut",
          onUpdate: (latest) =>
            (score.innerHTML = Math.round(latest).toString()),
        });
      }
    });

    circles.forEach((circle) => {
      if (circle instanceof SVGElement && circle.style) {
        const circumference = parseFloat(
          circle.style.strokeDasharray || '0'
        );
        const scorePercent = parseInt(circle.dataset.score || '100', 10) / 100;
        const targetOffset = circumference * (1 - scorePercent);

        if (isNaN(circumference) || circumference <= 0) {
            return;
        }
        animate(circumference, targetOffset, { // Animate to the target offset based on score
          duration: 2,
          ease: "circOut",
          onUpdate: (latest) =>
            (circle.style.strokeDashoffset = latest.toString()),
        });
      }
    });
  });
})();
`;


// Component Definitions using JSX
const Hero: FC = () => {
  return (
    <div className="px-4 pt-10 sm:pt-16">
      <div
        className="relative mx-auto max-w-6xl rounded-2xl bg-background h-[70vh] min-h-[600px] flex items-center justify-center px-6 pb-4 overflow-hidden border border-gray-200 dark:border-gray-800"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              "--grid-size": "50px",
              backgroundSize: "var(--grid-size) var(--grid-size)",
              backgroundImage:
                "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
              maskImage: "radial-gradient(circle at center, white 40%, transparent 70%)",
            }}
          ></div>
        </div>

        <div className="relative text-center max-w-3xl mx-auto">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-semibold mb-6 text-gray-900 dark:text-white"
          >
            Partial Hydration<br />Made Simple
          </h2>
          <p
            className="text-xl mb-8 max-w-xl mx-auto text-gray-500 dark:text-gray-400"
          >
            A zero-dependency web component for Islands Architecture. Keep your pages fast and add interactivity exactly where you need it.
          </p>
          <div className="flex gap-4 justify-center flex-col items-center">
            <div className="flex gap-4">
              <Button href="/docs" prefetch>Get Started</Button>
              <Button href="/docs/ai-skill" variant="outlined" prefetch>AI Agent Skill</Button>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ParticlesDemo: FC = () => {
  const particleStyles = `
    .particles-section {
      --color-foreground: white;
    }
    .particles-section a:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
      color: white !important;
    }
  `;

  return (
    <section
      className="relative min-h-[600px] flex items-center justify-center w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-black py-24"
    >
      <style dangerouslySetInnerHTML={{ __html: particleStyles }}></style>
      <Particles
        className="absolute inset-0"
        quantity={200}
        color="#ffffff"
        size={0.8}
        staticity={20}
        ease={20}
        vx={0.2}
        vy={0.2}
      />
      <div
        className="relative z-10 text-center w-full mx-auto px-4 particles-section"
      >
        <div className="mb-12 w-full md:w-[60vw] mx-auto">
          <div
            className="w-full aspect-video border border-white/10 rounded-2xl overflow-hidden"
          >
            <iframe
              src="https://iframe.mediadelivery.net/embed/382505/fc75947d-4045-45c7-a705-62f8ba47ae5a?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
              loading="lazy"
              class="w-full h-full"
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <h2
          className="text-4xl md:text-5xl font-heading font-semibold mb-6 text-white"
        >
          Build Faster with Spokesite
        </h2>
        <p className="max-w-xl mx-auto text-xl mb-8 text-gray-400">
          Use our AI website generator to get a Sapling project live on the web
          in seconds
        </p>
        <Button
          inline={true}
          href="https://spokesite.com"
          variant="outlined"
        >
          Get Started with Spokesite
        </Button>
      </div>
    </section>
  );
};

const Features: FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-heading font-semibold mb-4 text-gray-900 dark:text-white"
          >
            A simple tool for building<br />modern websites
          </h2>
          <p
            className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            If you know HTML, CSS, Tailwind, and JavaScript, you can build a
            website with Sapling.
          </p>
        </div>

        <FeatureGrid>
            <FeatureGridItem>
                <div className="relative h-64 sm:h-[302px]">
                  <sapling-island loading="visible">
                    <template>
                       <script type="module" dangerouslySetInnerHTML={{ __html: scoreAnimationScript }}></script>
                    </template>
                    <div className="h-full flex items-center justify-center">
                      <div
                        className="h-[302px] w-full flex items-center justify-center gap-8 border border-gray-200 dark:border-gray-800 rounded-lg p-8 bg-[radial-gradient(100%_100%_at_50%_0%,var(--score-color)_0%,transparent_100%)]"
                        style={{ "--score-color": "rgba(34,197,94,0.1)" }}
                      >
                        <ScoreCircle
                          width={80}
                          height={80}
                          score={100}
                          label="Best Practices"
                        />
                        <ScoreCircle
                          width={100}
                          height={100}
                          score={100}
                          label="Performance"
                        />
                        <ScoreCircle
                          width={80}
                          height={80}
                          score={100}
                          label="SEO"
                        />
                      </div>
                    </div>
                  </sapling-island>
                </div>
                <FeatureContent
                  title="SEO & Performance First"
                  description="Sapling is built for speed. Using web development best practices for SEO and performance."
                />
            </FeatureGridItem>
            <FeatureGridItem variant="dots">
                <div className="relative h-64 overflow-hidden sm:h-[302px]">
                  {/* Zero JS Content */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      className="text-[300px] leading-none font-heading font-bold text-gray-900/20 dark:text-white/60"
                    >
                      0<span className="-ml-5 text-lg">kb</span>
                    </div>
                  </div>
                </div>
                <FeatureContent
                  title="Zero JavaScript by Default"
                  description="Sapling doesn't output any javascript out of the box. Just good old HTML and CSS."
                />
            </FeatureGridItem>
            <FeatureGridItem>
                <div className="relative h-64 overflow-hidden sm:h-[302px]">
                  {/* Islands Architecture Demo */}
                  <div className="relative w-full">
                    {/* Webpage Skeleton Layout */}
                    <div
                      className="h-[302px] border border-gray-200 dark:border-gray-800 rounded-lg p-6"
                    >
                      {/* Header */}
                      <div
                          className="h-24 mb-6 border-beam-container relative flex items-center justify-center bg-[radial-gradient(100%_100%_at_50%_0%,var(--island-color)_0%,transparent_100%)]"
                          style={{ "--island-color": "rgba(134,239,172,0.1)" }}
                      >
                        <div className="border-beam"></div>
                        <div className="w-12 h-12">
                          <picture>
                            <source
                              srcSet="/assets/images/island.avif" // Use camelCase for srcSet
                              type="image/avif"
                            />
                            <source
                              srcSet="/assets/images/island.webp"
                              type="image/webp"
                            />
                            <img
                              width="48"
                              height="48"
                              src="/assets/images/island.png"
                              alt="Interactive Header"
                              className="w-full h-full object-contain opacity-80"
                              loading="lazy"
                              decoding="async"
                            />
                          </picture>
                        </div>
                      </div>

                      {/* Two Column Layout */}
                      <div className="grid grid-cols-3 gap-6">
                        {/* Sidebar */}
                        <div
                          className="h-[180px] col-span-1 border-beam-container relative flex items-center justify-center bg-[radial-gradient(100%_100%_at_50%_0%,var(--island-color)_0%,transparent_100%)]"
                          style={{ "--island-color": "rgba(134,239,172,0.1)" }}
                        >
                          <div className="border-beam"></div>
                          <div className="w-12 h-12">
                            <picture>
                              <source
                                srcSet="/assets/images/island.avif"
                                type="image/avif"
                              />
                              <source
                                srcSet="/assets/images/island.webp"
                                type="image/webp"
                              />
                              <img
                                src="/assets/images/island.png"
                                alt="Interactive Nav"
                                className="w-full h-full object-contain opacity-80"
                                loading="lazy"
                                decoding="async"
                              />
                            </picture>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="col-span-2 space-y-6">
                          {/* Static Content Block */}
                          <div
                            className="h-[84px] relative flex items-center justify-center bg-[radial-gradient(100%_100%_at_50%_0%,var(--static-color)_0%,transparent_100%)] border border-gray-200 dark:border-gray-800 rounded-lg"
                            style={{ "--static-color": "rgba(100,100,100,0.05) dark:rgba(0,0,0,0.1)" }}
                          ></div>

                          {/* Static Content Block */}
                          <div
                            className="h-[84px] relative flex items-center justify-center bg-[radial-gradient(100%_100%_at_50%_0%,var(--static-color)_0%,transparent_100%)] border border-gray-200 dark:border-gray-800 rounded-lg"
                            style={{ "--static-color": "rgba(100,100,100,0.05) dark:rgba(0,0,0,0.1)" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <FeatureContent
                  title="Islands Architecture"
                  description="Add interactivity only where you need it. Keep the rest of your site fast and lightweight."
                />
            </FeatureGridItem>
            <FeatureGridItem>
                <div className="space-y-8 overflow-hidden sm:h-[302px]">
                  <div className="h-[302px] w-full grid grid-cols-2 gap-4">
                    <div
                      className=" flex items-center justify-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-[radial-gradient(100%_100%_at_50%_0%,var(--js-color)_0%,transparent_100%)]"
                      style={{ "--js-color": "rgba(247,223,30,0.1)" }}
                    >
                      <JsLogo />
                    </div>
                    <div
                      className=" flex items-center justify-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-[radial-gradient(100%_100%_at_50%_0%,var(--ts-color)_0%,transparent_100%)]"
                      style={{ "--ts-color": "rgba(49,120,198,0.1)" }}
                    >
                      <TsLogo />
                    </div>
                    <div
                      className=" flex items-center justify-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-[radial-gradient(100%_100%_at_50%_0%,var(--css-color)_0%,transparent_100%)]"
                      style={{ "--css-color": "rgba(102,51,153,0.1)" }}
                    >
                      <CssLogo />
                    </div>
                    <div
                      className="flex items-center justify-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-[radial-gradient(100%_100%_at_50%_0%,var(--html-color)_0%,transparent_100%)]"
                      style={{ "--html-color": "rgba(241,101,41,0.1)" }}
                    >
                      <HtmlLogo />
                    </div>
                  </div>
                </div>
                <FeatureContent
                  title="Basic by Design #usetheplatform"
                  description="Build with JavaScript, TypeScript, HTML, and CSS. We don't tie you to any specific framework or bundler which means you can use what you want."
                />
            </FeatureGridItem>
        </FeatureGrid>
      </div>
    </section>
  );
};

const DeploySection: FC = () => {
  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-6">
              Deploy Anywhere
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 mb-8">
              Deploy your Sapling site to any platform that supports JavaScript.
              From Deno Deploy to Vercel, Netlify, or your own infrastructure.
            </p>
            <Button
              inline={true}
              href="https://github.com/treefarmstudio/examples?tab=readme-ov-file#deployment-examples"
              variant="outlined"
            >
              View Deployment Examples
            </Button>
          </div>
          <div className="overflow-hidden"><LogoMarquee /></div>
        </div>
      </div>
    </section>
  );
};

const TileSection: FC = () => {
  return (
    <section
      className="my-16 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-24 px-6"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 w-full h-full">
        <div
          className="absolute inset-0"
          style={{
            "--grid-size": "50px",
            backgroundSize: "var(--grid-size) var(--grid-size)",
            backgroundImage:
              "linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)",
          }}
        ></div>
      </div>
      {/* Content Container */}
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden relative bg-background/80 dark:bg-black/80 backdrop-blur-sm p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold mb-4">
              Build Fast Websites
            </h2>
            <p
              className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Create beautiful, performant websites without the complexity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Zero JavaScript"
              description="Ship only what you need. No bloated JavaScript bundles by default."
            />
            <FeatureCard
              title="Server Rendered"
              description="Fast page loads with server-side rendering and progressive enhancement."
            />
            <FeatureCard
              title="TypeScript First"
              description="Built with TypeScript for better developer experience and type safety."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Faq: FC = () => {
  const faqItems = [
    {
      question: "What is Sapling?",
      answer:
        "Sapling is a zero-dependency, framework-agnostic web component (<sapling-island>) that allows you to progressively hydrate parts of your page. It helps you keep most of your page as static HTML, loading JavaScript and styles only when specific conditions are met.",
    },
    {
      question: "Why should I choose Sapling over other frameworks?",
      answer:
        "Sapling isn't a full framework—it's a tool that works with the stack you already have. If you're building traditional server-rendered websites but want the interactivity of modern frameworks without the bloated JS bundles, Sapling lets you easily implement Islands Architecture anywhere.",
    },
    {
      question: "Can I still use React or Svelte or other frontend frameworks?",
      answer:
        "Yes! Sapling is completely framework-agnostic. You can use it within JSX, React, Vanilla HTML, or any templating language. It simply acts as a boundary to tell the browser when and how to load the interactive bits of your UI.",
    },
    {
      question: "How do I control when the JavaScript loads?",
      answer:
        "Sapling supports several loading strategies via the `loading` attribute. You can load scripts immediately (`load`), when the element scrolls into view (`visible`), when the main thread is idle (`idle`), based on media queries (`(min-width: 768px)`), or after a specific timeout.",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl text-center font-heading font-semibold mb-8"
        >
          Frequently Asked Questions
        </h2>
        <FaqAccordion items={faqItems} />
      </div>
    </section>
  );
};

// Main Page Component
export default async function Home() { // Return JSX.Element
  const headStyles = `
    copy-code-button {
      --copy-code-button-foreground: #fff;
      --copy-code-button-success-color: #4ade80; /* Added success color */
    }
    .border-beam-container {
      position: relative;
      border-radius: 0.75rem;
      padding: 1.5rem;
      background: radial-gradient(
        100% 100% at 50% 0%,
        rgba(134, 239, 172, 0.05),
        transparent
      );
      overflow: hidden;
      border: 0.5px solid rgba(0, 0, 0, 0.05);
    }

    @media (prefers-color-scheme: dark) {
      .border-beam-container {
        border-color: rgba(255, 255, 255, 0.05);
        background: radial-gradient(
          100% 100% at 50% 0%,
          rgba(134, 239, 172, 0.02),
          transparent
        );
      }
    }

    .border-beam {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      border: calc(var(--border-width, 1.5) * 1px) solid transparent;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0.5;
    }

    @keyframes border-beam {
      from {
        offset-distance: 0%;
      }
      to {
        offset-distance: 100%;
      }
    }

    .border-beam::after {
      content: "";
      position: absolute;
      width: calc(var(--size, 150) * 1px);
      aspect-ratio: 1;
      background: linear-gradient(
        to left,
        var(--color-from, #40ff8f),
        var(--color-to, #4075ff),
        transparent
      );
      offset-anchor: calc(var(--anchor, 90) * 1%) 50%;
      offset-path: rect(0 auto auto 0 round calc(var(--size, 150) * 1px));
      animation: border-beam var(--duration, 15s) linear infinite;
      animation-delay: calc(var(--delay, 0) * -1s);
    }
  `;

  const codePreviewContent = await CodePreview();

  return (
    <Layout
      title="Sapling - Partial Hydration Web Component"
      description="Sapling is a zero-dependency web component for implementing Islands Architecture and partial hydration in any web project."
      head={<style dangerouslySetInnerHTML={{ __html: headStyles }}></style>}
    >
      <Fragment>
        <Hero />
        {codePreviewContent}
        <Features />
        <Faq />
      </Fragment>
    </Layout>
  );
}
