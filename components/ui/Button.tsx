import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-body font-semibold transition-[transform,background-color,border-color] duration-micro ease-standard hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary";

const variants = {
  primary: "bg-accent text-on-accent hover:brightness-105",
  secondary: "bg-text-primary text-bg hover:opacity-90",
  outline:
    "border border-border bg-surface text-text-primary backdrop-blur-md hover:border-text-primary",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
