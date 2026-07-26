import Image from "next/image";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Project } from "@/content/projects";

// Co-located here rather than components/ui/ — only SelectedWorkSection uses it today.
// See docs/ARCHITECTURE.md "put it in the section that uses it".
export function ProjectCard({
  project,
  index,
  tone = "light",
}: {
  project: Project;
  index: number;
  tone?: "light" | "dark";
}) {
  const number = String(index + 1).padStart(2, "0");
  const isDark = tone === "dark";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border transition-[transform,border-color] duration-micro ease-standard hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        isDark
          ? "border-border-dark bg-surface-dark hover:border-accent"
          : "border-border bg-surface backdrop-blur-md hover:border-text-primary"
      }`}
    >
      <div className="relative">
        {project.image ? (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={project.image}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 22rem, 80vw"
            />
          </div>
        ) : (
          <Placeholder aspect="card" label={project.title} />
        )}

        <span
          className={`absolute left-4 top-4 rounded-full px-2.5 py-1 font-mono text-caption font-semibold ${
            isDark ? "bg-black/60 text-text-on-dark" : "bg-white/70 text-text-primary"
          }`}
        >
          {number}
        </span>

        <ul className="absolute right-4 top-4 flex flex-wrap justify-end gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <span
                className={`rounded-full px-2.5 py-1 font-mono text-[0.6875rem] ${
                  isDark
                    ? "bg-black/60 text-text-secondary-on-dark"
                    : "bg-white/70 text-text-secondary"
                }`}
              >
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-h3 font-bold">{project.title}</h3>
        <p
          className={`mt-2 flex-1 text-body ${
            isDark ? "text-text-secondary-on-dark" : "text-text-secondary"
          }`}
        >
          {project.summary}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {project.stack.slice(0, 2).map((item) => (
              <li key={item}>
                <Tag tone={tone}>{item}</Tag>
              </li>
            ))}
          </ul>
          <span
            aria-hidden
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-micro ease-standard group-hover:rotate-45"
          >
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
