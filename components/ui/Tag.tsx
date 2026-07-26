import type { ReactNode } from "react";

export function Tag({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  const toneClass =
    tone === "dark"
      ? "border-border-dark text-text-secondary-on-dark"
      : "border-border text-text-secondary";

  return (
    <span
      className={`rounded-full border px-3 py-1 font-mono text-caption ${toneClass}`}
    >
      {children}
    </span>
  );
}
