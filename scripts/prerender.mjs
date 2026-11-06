import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const seo = await import(pathToFileURL(path.join(root, "src/data/seo.js")).href);
const { SITE, NAME, SUMMARY, PAGES, profile, experience, projects, ossContributions, freelanceProjects, articles, publications, headBlock, pageMeta } = seo;

function parseFrontmatter(raw) {
  const match = raw.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: raw };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    meta[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { meta, content: match[2].trim() };
}

const postsDir = path.join(root, "src/blog/posts");
const posts = fs
  .readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const slug = f.replace(/\.md$/, "");
    const { meta, content } = parseFrontmatter(fs.readFileSync(path.join(postsDir, f), "utf8"));
    return { slug, title: meta.title || slug, date: meta.date || "", summary: meta.summary || "", content };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bullets = (list) => `<ul>${list.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>`;
const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;

const nav = `<nav aria-label="Primary"><a href="/">Home</a> <a href="/projects">Projects</a> <a href="/publications">Publications</a> <a href="/experience">Experience</a> <a href="/work">Work</a> <a href="/blog">Blog</a></nav>`;

const bodies = {
  "/": () =>
    `<h1>${esc(profile.name)}: ${esc(profile.tagline)}</h1>${profile.bio.map((p) => `<p>${esc(p)}</p>`).join("")}<ul>${profile.socials
      .map((s) => `<li>${link(s.url, s.label)}</li>`)
      .join("")}<li>${link("/resume.pdf", "Resume (PDF)")}</li></ul>`,
  "/experience": () =>
    `<h1>Experience</h1>${experience
      .map((j) => `<section><h2>${esc(j.role)}, ${esc(j.org)}</h2><p>${esc(j.location)} | ${esc(j.period)}</p>${bullets(j.bullets)}</section>`)
      .join("")}`,
  "/projects": () =>
    `<h1>Projects</h1>${projects
      .map(
        (p) =>
          `<section><h2>${p.repo ? link(p.repo, p.name) : esc(p.name)}</h2>${p.period ? `<p>${esc(p.period)}</p>` : ""}<p>Stack: ${esc(p.stack.join(", "))}</p>${bullets(p.bullets)}</section>`,
      )
      .join("")}`,
  "/work": () =>
    `<h1>Open Source and Freelance Work</h1><h2>Merged pull requests</h2><ul>${ossContributions
      .map((c) => `<li>${link(c.url, `${c.repo} ${c.pr}`)}: ${esc(c.description)}</li>`)
      .join("")}</ul><h2>Freelance</h2>${freelanceProjects
      .map((p) => `<section><h3>${esc(p.name)}</h3><p>Stack: ${esc(p.stack.join(", "))}</p>${bullets(p.bullets)}</section>`)
      .join("")}`,
  "/publications": () =>
    `<h1>Publications</h1>${publications
      .map((p) => `<section><h2>${p.url ? link(p.url, p.title) : esc(p.title)}</h2><p>${esc(p.status)}</p><p>${esc(p.description)}</p></section>`)
      .join("")}`,
  "/blog": () =>
    `<h1>Blog</h1><h2>Articles on X</h2><ul>${articles.map((a) => `<li>${link(a.url, a.title)} (${esc(a.date)})</li>`).join("")}</ul><h2>Posts</h2><ul>${posts
      .map((p) => `<li>${link(`/blog/${p.slug}`, p.title)} (${esc(p.date)}): ${esc(p.summary)}</li>`)
      .join("")}</ul>`,
};

function postBody(post) {
  const md = renderToStaticMarkup(createElement(ReactMarkdown, { remarkPlugins: [remarkGfm] }, post.content));
  return `<article><h1>${esc(post.title)}</h1><p>${esc(post.date)}</p>${md}</article>`;
}

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const SEO_BLOCK = /<!--seo-start-->[\s\S]*?<!--seo-end-->/;
if (!SEO_BLOCK.test(template)) throw new Error("index.html is missing the <!--seo-start-->/<!--seo-end--> markers");

function render(route, body) {
  const head = `<!--seo-start-->\n    ${headBlock(route, posts)}\n    <!--seo-end-->`;
  const html = template
    .replace(SEO_BLOCK, () => head)
    .replace('<div id="root"></div>', () => `<div id="root">${nav}<main>${body}</main></div>`);
  const out = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
}

const routes = [...Object.keys(PAGES), ...posts.map((p) => `/blog/${p.slug}`)];
for (const route of routes) {
  const post = posts.find((p) => `/blog/${p.slug}` === route);
  render(route, post ? postBody(post) : bodies[route]());
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => {
      const post = posts.find((p) => `/blog/${p.slug}` === r);
      return `  <url><loc>${SITE}${r === "/" ? "/" : r}</loc><lastmod>${post && post.date ? post.date : today}</lastmod></url>`;
    })
    .join("\n")}\n</urlset>\n`,
);

const llms = [
  `# ${NAME}`,
  "",
  `> ${SUMMARY}`,
  "",
  "## Pages",
  ...routes.map((r) => {
    const m = pageMeta(r, posts);
    return `- [${m.heading}](${SITE}${r === "/" ? "/" : r}): ${m.description}`;
  }),
  "",
  "## Key links",
  `- [Full profile as one Markdown file](${SITE}/llms-full.txt)`,
  `- [Resume (PDF)](${SITE}/resume.pdf)`,
  "- [TrenTorch](https://trentorch.com): open-source ML education platform co-maintained by Maanas Tyagi",
  ...profile.socials.filter((s) => !s.url.startsWith("mailto:")).map((s) => `- [${s.label}](${s.url})`),
  `- Contact: ${profile.email}`,
  "",
].join("\n");
fs.writeFileSync(path.join(dist, "llms.txt"), llms);

const mdBullets = (l) => l.map((b) => `- ${b}`).join("\n");
const full = [
  `# ${NAME}`,
  "",
  `> ${SUMMARY}`,
  "",
  `Site: ${SITE}/ | Updated: ${today} | Contact: ${profile.email}`,
  "",
  "## About",
  "",
  ...profile.bio.flatMap((p) => [p, ""]),
  "## Experience",
  "",
  ...experience.flatMap((j) => [`### ${j.role}, ${j.org} (${j.period}, ${j.location})`, "", mdBullets(j.bullets), ""]),
  "## Projects",
  "",
  ...projects.flatMap((p) => [`### ${p.name}${p.repo ? ` (${p.repo})` : ""}`, "", `Stack: ${p.stack.join(", ")}${p.period ? ` | ${p.period}` : ""}`, "", mdBullets(p.bullets), ""]),
  "## Open-source contributions",
  "",
  mdBullets(ossContributions.map((c) => `${c.repo} ${c.pr} (${c.url}): ${c.description}`)),
  "",
  "## Freelance work",
  "",
  ...freelanceProjects.flatMap((p) => [`### ${p.name}`, "", `Stack: ${p.stack.join(", ")}`, "", mdBullets(p.bullets), ""]),
  "## Publications",
  "",
  ...publications.flatMap((p) => [`### ${p.title}`, "", `Status: ${p.status}${p.url ? ` | ${p.url}` : ""}`, "", p.description, ""]),
  "## Articles on X",
  "",
  mdBullets(articles.map((a) => `[${a.title}](${a.url}) (${a.date})`)),
  "",
  "## Blog posts",
  "",
  ...posts.flatMap((p) => [`### ${p.title} (${p.date})`, "", `${SITE}/blog/${p.slug}`, "", p.content, ""]),
].join("\n");
fs.writeFileSync(path.join(dist, "llms-full.txt"), full);

console.log(`prerendered ${routes.length} routes, sitemap.xml, llms.txt, llms-full.txt`);
