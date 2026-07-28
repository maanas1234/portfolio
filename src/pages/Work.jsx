import { ossContributions, freelanceProjects } from "../data/content";
import Tag from "../components/Tag";

export default function Work() {
  return (
    <div className="flex flex-col gap-12">

      <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-[var(--text)]">
          OSS Contributions
          <span className="ml-2 font-mono-tag text-sm font-normal text-[var(--text-dim)]">merged PRs</span>
        </h1>
        <div className="flex flex-col gap-3">
          {ossContributions.map((c) => (
            <div key={c.url} className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] px-5 py-4">
              <a href={c.url} target="_blank" rel="noreferrer" className="font-mono-tag text-sm text-[var(--accent)] hover:underline">
                {c.repo} {c.pr}
              </a>
              <p className="mt-1 text-sm leading-relaxed text-[var(--text-dim)]">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Freelance
          <span className="ml-2 font-mono-tag text-sm font-normal text-[var(--text-dim)]">client work</span>
        </h2>
        <div className="flex flex-col gap-6">
          {freelanceProjects.map((project) => (
            <article key={project.name} className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-6">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium text-[var(--text)]">{project.name}</h3>
                {project.period && (
                  <span className="font-mono-tag text-xs text-[var(--text-dim)]">{project.period}</span>
                )}
              </div>
              <div className="mb-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
              <ul className="flex flex-col gap-1.5">
                {project.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed text-[var(--text-dim)]">
                    <span className="text-[var(--accent)]">–</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
}
