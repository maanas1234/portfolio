import { profile } from "../data/content";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
<p className="font-mono-tag text-sm text-[var(--accent)]">Hi, I'm Maanas</p>
          <h1 className="text-3xl font-semibold text-[var(--text)] sm:text-4xl">{profile.tagline}</h1>
          {profile.bio.map((para, i) => (
            <p key={i} className="max-w-xl leading-relaxed text-[var(--text-dim)]">
              {para}
            </p>
          ))}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="font-mono-tag text-sm text-[var(--text-dim)] hover:text-[var(--accent)]"
              >
                {social.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              download
              className="font-mono-tag text-sm text-[var(--accent)] hover:underline"
            >
              resume ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
