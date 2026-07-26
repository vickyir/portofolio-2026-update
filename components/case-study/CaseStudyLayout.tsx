import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Project } from "@/content/projects";

export function CaseStudyLayout({ project }: { project: Project }) {
  return (
    <article>
      <header className="pb-16 pt-32">
        <Container>
          <Reveal>
            <p className="mb-4 font-mono text-caption uppercase tracking-wide text-text-secondary">
              {project.type === "case-study" ? "Case study" : "Selected engagements"}
            </p>
            <h1 className="max-w-3xl text-h1 font-semibold text-text-primary">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
              {project.summary}
            </p>
          </Reveal>
        </Container>
      </header>

      {project.image ? (
        <div className="relative aspect-[16/9] w-full">
          <Image src={project.image} alt="" fill className="object-cover" priority />
        </div>
      ) : (
        <Placeholder aspect="wide" label={project.title} />
      )}

      <Container className="grid gap-16 py-16 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <section>
            <Reveal>
              <h2 className="text-h3 font-semibold text-text-primary">Problem</h2>
              <p className="mt-4 text-body text-text-secondary">{project.problem}</p>
            </Reveal>
          </section>
          <section>
            <Reveal delayMs={80}>
              <h2 className="text-h3 font-semibold text-text-primary">Outcome</h2>
              <p className="mt-4 text-body text-text-secondary">{project.outcome}</p>
            </Reveal>
          </section>
        </div>

        <aside>
          <Reveal delayMs={160} className="space-y-8">
            <div>
              <h2 className="font-mono text-caption uppercase tracking-wide text-text-secondary">
                Role
              </h2>
              <p className="mt-2 text-body text-text-primary">{project.role}</p>
            </div>
            <div>
              <h2 className="font-mono text-caption uppercase tracking-wide text-text-secondary">
                Stack
              </h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </Container>
    </article>
  );
}
