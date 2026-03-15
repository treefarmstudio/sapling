import { Fragment } from "hono/jsx";


export function Button({
  leadingIcon,
  trailingIcon,
  children,
  href,
  inline = false,
  variant = "solid",
  prefetch = false,
  download,
}: {
  leadingIcon?: string;
  trailingIcon?: string;
  children: string;
  href?: string;
  inline?: boolean;
  variant?: "solid" | "outlined";
  prefetch?: boolean;
  download?: boolean | string;
}) {
  const baseClassName =
    variant === "outlined"
      ? `border-2 border-foreground text-foreground px-4 py-2 rounded-full font-medium hover:bg-foreground hover:text-background transition-colors flex items-center space-x-2 whitespace-nowrap group`
      : `bg-foreground text-background px-4 py-2 rounded-full font-medium hover:bg-foreground hover:text-background transition-colors flex items-center space-x-2 whitespace-nowrap group`;
  const className = `${baseClassName} ${inline ? "inline-flex" : ""}`;

  const iconClassName =
    variant === "outlined"
      ? "text-foreground transition-colors group-hover:text-background"
      : "text-background group-hover:text-background";

  const content = (
    <Fragment>
      {leadingIcon && (
        <iconify-icon
          icon={leadingIcon}
          class={iconClassName}
        ></iconify-icon>
      )}
      <span>{children}</span>
      {trailingIcon && (
        <iconify-icon
          icon={trailingIcon}
          class={iconClassName}
        ></iconify-icon>
      )}
    </Fragment>
  );

  if (!href) {
    return <button type="button" className={className}>{content}</button>;
  }

  return (
    <a
      href={href}
      className={className}
      {...(download ? { download } : {})}
      {...(prefetch ? { "data-prefetch": "true" } : {})}
    >
      {content}
    </a>
  );
}
