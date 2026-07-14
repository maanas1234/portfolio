import { projects, freelanceProjects } from "../data/content";
import Tag from "../components/Tag";

function ProjectCard({ project }) {
  return (
    <article className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-6">
      <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-medium text-[var(--text)]">
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h2>
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
  );
}

export default function Projects() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-[var(--text)]">Projects</h1>
        <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
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
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
      <p className="font-mono-tag text-sm text-[var(--text-dim)]">more building in progress. check back soon (or just watch the github).</p>
    </div>
  );
}
