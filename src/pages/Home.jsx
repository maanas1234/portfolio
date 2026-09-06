import { profile } from "../data/content";

const BIO_LINKS = [
  { text: "Hugging Face", url: "https://huggingface.co" },
  { text: "TrenTorch", url: "https://github.com/TrenTorch/TrenTorch" },
];

function renderBio(text) {
  let segments = [{ type: "text", content: text }];
  for (const { text: linkText, url } of BIO_LINKS) {
    const next = [];
    for (const seg of segments) {
      if (seg.type !== "text") { next.push(seg); continue; }
      const parts = seg.content.split(linkText);
      parts.forEach((part, i) => {
        if (part) next.push({ type: "text", content: part });
        if (i < parts.length - 1) next.push({ type: "link", content: linkText, url });
      });
    }
    segments = next;
  }
  if (segments.length === 1 && segments[0].type === "text") return text;
  return segments.map((seg, i) =>
    seg.type === "link"
      ? <a key={i} href={seg.url} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">{seg.content}</a>
      : seg.content
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-2 font-mono-tag text-sm text-[var(--text)]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            Open to Summer 2027 · AI Engineer Internships
          </div>
<p className="font-mono-tag text-sm text-[var(--accent)]">Hi, I'm Maanas</p>
          <h1 className="text-3xl font-semibold text-[var(--text)] sm:text-4xl">{profile.tagline}</h1>
          {profile.bio.map((para, i) => (
            <p key={i} className="leading-relaxed text-[var(--text-dim)]">
              {renderBio(para)}
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
