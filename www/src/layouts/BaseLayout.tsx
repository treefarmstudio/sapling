/** @jsxImportSource hono/jsx */
import type { HtmlEscapedString } from "hono/utils/html";
import type { PropsWithChildren } from "hono/jsx";
import { BaseHead } from "../components/BaseHead.ts";
import { Footer } from "../components/Footer.tsx";
import { Nav } from "../components/Nav.tsx";

export type BaseLayoutProps = PropsWithChildren<{
  title: string;
  description: string;
  head?: HtmlEscapedString | Promise<HtmlEscapedString>;
  bodyClass?: string;
}>;

export default async function Layout({
  head: additionalHead,
  children,
  ...props
}: BaseLayoutProps) {
  const defaultHeadContent = BaseHead({
    title: props.title,
    description: props.description,
  });

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {defaultHeadContent}
        {additionalHead || ""}
      </head>
      <body class={`font-sans bg-background text-foreground ${props.bodyClass || ""}`}>
        <Nav />
        <a href="#main-content" class="skip-to-main">Skip to main content</a>
        <div class="relative z-10">
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
