import { html } from "hono/html";

export function BaseHead({
  title = "Sapling",
  description = "Sapling is a modern SSR framework for simpler modern websites",
  canonical = "https://sapling.land/",
}) {
  return html`
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:image" content="https://sapling.land/social.png" />
    <link rel="stylesheet" href="/styles/main.css" />
    <style>
      @font-face {
        font-display: swap;
        font-family: "Open Sans";
        src: url("/assets/fonts/OpenSans-Variable.woff2") format("woff2"),
          url("/assets/fonts/OpenSans-Variable.woff") format("woff");
        font-weight: 400 700;
        font-style: normal;
      }
      @font-face {
        font-display: swap;
        font-family: "Cabinet Grotesk";
        src: url("/assets/fonts/CabinetGrotesk-Variable.woff2") format("woff2"),
          url("/assets/fonts/CabinetGrotesk-Variable.woff") format("woff");
        font-weight: 400 800;
        font-style: normal;
      }
      @font-face {
        font-display: swap;
        font-family: "Instrument Serif";
        src: url("/assets/fonts/InstrumentSerif-Italic.woff2") format("woff2"),
          url("/assets/fonts/InstrumentSerif-Italic.woff") format("woff");
        font-weight: 400;
        font-style: italic;
      }
      :root {
        --color-background: #fff;
        --color-foreground: #000;
        --color-primary: #000;
        --color-muted: #666;
        --color-muted-border: #e2e8f0;
        --color-on-primary: #fff;
        --color-secondary: #fff;
        --grid-color: rgba(0, 0, 0, 0.05);
      }
      ::selection {
        background-color: var(--color-primary);
        color: var(--color-on-primary);
      }

      .skip-to-main {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
        display: block;
        text-decoration: none;
        z-index: 100;
      }

      .skip-to-main:focus {
        position: fixed;
        top: 1rem;
        left: 1rem;
        width: auto;
        height: auto;
        padding: 0.5rem 1rem;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        background: var(--color-primary);
        color: var(--color-on-primary);
        border-radius: 0.25rem;
      }

      
      @media (prefers-color-scheme: dark) {
        :root {
          --color-background: #0e0e0e;
          --color-foreground: #fff;
          --color-primary: #fff;
          --color-on-primary: #000;
          --color-muted: #ccc;
          --color-muted-border: #333;
          --grid-color: rgb(26 26 26 / 93%);
        }
        .shiki,
        .shiki span {
          color: var(--shiki-dark) !important;
          background-color: var(--shiki-dark-bg) !important;
          /* Optional, if you also want font styles */
          font-style: var(--shiki-dark-font-style) !important;
          font-weight: var(--shiki-dark-font-weight) !important;
          text-decoration: var(--shiki-dark-text-decoration) !important;
        }
      }
    </style>
    <script type="module" src="/scripts/prefetch.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/sapling-island@0.2.2"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/iconify-icon@2.1.0/dist/iconify-icon.min.js"
      defer
    ></script>
    <script
    defer
    data-website-id="dfid_Blk51WVZa0MRrm0YSIHSg"
    data-domain="sapling.land"
    src="https://datafa.st/js/script.js">
  </script>
  `;
}
