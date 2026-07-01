import { publications } from "../data/content";

export default function Publications() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-2xl font-semibold text-[var(--text)]">Publications</h1>
      {publications.map((pub) => (
        <article key={pub.title} className="rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-6">
          <h2 className="mb-1 text-lg font-medium text-[var(--text)]">
            {pub.url ? (
              <a href={pub.url} target="_blank" rel="noreferrer" className="hover:text-[var(--accent)]">
                {pub.title}
              </a>
            ) : (
              pub.title
            )}
          </h2>
          <p className="font-mono-tag mb-3 text-xs text-[var(--accent)]">{pub.status}</p>
          <p className="text-sm leading-relaxed text-[var(--text-dim)]">{pub.description}</p>
        </article>
      ))}
    </div>
  );
}
