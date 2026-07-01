const files = import.meta.glob("./posts/*.md", { query: "?raw", import: "default", eager: true });

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };

  const meta = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  }
  return { meta, content: match[2].trim() };
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.replace("./posts/", "").replace(".md", "");
    const { meta, content } = parseFrontmatter(raw);
    return {
      slug,
      title: meta.title || slug,
      date: meta.date || "",
      summary: meta.summary || "",
      content,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}
