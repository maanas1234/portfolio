import { profile, experience, projects, ossContributions, freelanceProjects, articles, publications } from "./content.js";

export const SITE = "https://www.maanastyagi.com";
export const NAME = "Maanas Tyagi";
export const IMAGE = `${SITE}/pfp.jpg`;

const SUMMARY =
  "Maanas Tyagi is an AI engineer and consultant at Swayu and co-maintainer of TrenTorch, an open-source ML education platform with 750+ GitHub stars. He has 100+ merged open-source pull requests, including to Hugging Face, and works on LLM applications, RAG evaluation, and agentic systems.";

export const PAGES = {
  "/": {
    title: "Maanas Tyagi | AI Engineer & Open-Source Maintainer",
    description: SUMMARY,
    heading: "Home",
  },
  "/experience": {
    title: "Experience | Maanas Tyagi",
    description:
      "Work experience of Maanas Tyagi: AI Engineer & Consultant at Swayu, Core Engineer & Co-Maintainer at TrenTorch, LLM Engineer at Sstudize, and AI & Analytics Intern at Genpact.",
    heading: "Experience",
  },
  "/projects": {
    title: "Projects | Maanas Tyagi",
    description:
      "Projects by Maanas Tyagi: TrenTorch (open-source ML education), a RAG evaluation system, a GPT-style language model built from scratch in PyTorch, and more.",
    heading: "Projects",
  },
  "/work": {
    title: "Open Source & Freelance Work | Maanas Tyagi",
    description:
      "Merged pull requests to Hugging Face tau and Transformers, plus freelance AI and automation work by Maanas Tyagi: GST reconciliation, custom CRM, RAG chatbot, resume screener, lead scraper.",
    heading: "Work",
  },
  "/publications": {
    title: "Publications | Maanas Tyagi",
    description:
      "Research by Maanas Tyagi on LLM behavior: a preprint on front-loading bias in large language models and a paper under review on instruction fidelity decay in small language model agents.",
    heading: "Publications",
  },
  "/blog": {
    title: "Blog & Articles | Maanas Tyagi",
    description:
      "Articles and posts by Maanas Tyagi on open source, learning AI engineering, LLM benchmarks, and AI agents.",
    heading: "Blog",
  },
};

function postDescription(post) {
  if (post.summary) return post.summary;
  const text = (post.content || "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 160) return text || SUMMARY;
  return text.slice(0, 157).replace(/\s+\S*$/, "") + "...";
}

export function pageMeta(path, posts = []) {
  if (PAGES[path]) return { ...PAGES[path], path };
  const m = path.match(/^\/blog\/([^/]+)$/);
  if (m) {
    const post = posts.find((p) => p.slug === m[1]);
    if (post) {
      return {
        title: `${post.title} | Maanas Tyagi`,
        description: postDescription(post),
        heading: post.title,
        path,
      };
    }
  }
  return null;
}

const personRef = { "@id": `${SITE}/#person` };

function person() {
  return {
    "@type": "Person",
    "@id": `${SITE}/#person`,
    name: NAME,
    url: `${SITE}/`,
    image: IMAGE,
    description: SUMMARY,
    jobTitle: "AI Engineer & Consultant",
    worksFor: { "@type": "Organization", name: "Swayu" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
    sameAs: profile.socials.filter((s) => !s.url.startsWith("mailto:")).map((s) => s.url),
    knowsAbout: [
      "Large language models",
      "Retrieval-augmented generation",
      "RAG evaluation",
      "Agentic AI systems",
      "Machine learning",
      "Deep learning",
      "Transformer architecture",
      "Open source software",
      "PyTorch",
      "Python",
    ],
  };
}

function website() {
  return { "@type": "WebSite", "@id": `${SITE}/#website`, url: `${SITE}/`, name: NAME, publisher: personRef, inLanguage: "en" };
}

function breadcrumb(meta) {
  const items = [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }];
  if (meta.path !== "/") {
    const isPost = meta.path.startsWith("/blog/");
    if (isPost) items.push({ "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` });
    items.push({ "@type": "ListItem", position: items.length + 1, name: meta.heading, item: `${SITE}${meta.path}` });
  }
  return { "@type": "BreadcrumbList", itemListElement: items };
}

export function jsonLd(path, posts = []) {
  const meta = pageMeta(path, posts);
  const graph = [website(), person()];
  const url = `${SITE}${path === "/" ? "/" : path}`;

  if (path === "/") {
    graph.push({ "@type": "ProfilePage", "@id": `${url}#profile`, url, name: meta.title, mainEntity: personRef, dateModified: new Date().toISOString().slice(0, 10) });
  } else {
    graph.push({ "@type": "WebPage", "@id": `${url}#webpage`, url, name: meta.title, description: meta.description, isPartOf: { "@id": `${SITE}/#website` }, about: personRef });
    graph.push(breadcrumb(meta));
  }

  if (path === "/projects") {
    graph.push({
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "SoftwareSourceCode",
          name: p.name,
          codeRepository: p.repo,
          description: p.bullets[0],
          programmingLanguage: p.stack[0],
          author: personRef,
        },
      })),
    });
  }
  if (path === "/publications") {
    graph.push({
      "@type": "ItemList",
      itemListElement: publications.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: { "@type": "ScholarlyArticle", headline: p.title, description: p.description, author: personRef, ...(p.url ? { url: p.url } : {}) },
      })),
    });
  }
  if (path === "/blog") {
    graph.push({
      "@type": "ItemList",
      itemListElement: [
        ...articles.map((a) => ({ "@type": "Article", headline: a.title, url: a.url, author: personRef })),
        ...posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/blog/${p.slug}`, datePublished: p.date, author: personRef })),
      ].map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
    });
  }
  const post = path.startsWith("/blog/") ? posts.find((p) => `/blog/${p.slug}` === path) : null;
  if (post) {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: post.title,
      description: postDescription(post),
      datePublished: post.date,
      dateModified: post.date,
      author: personRef,
      mainEntityOfPage: url,
      image: IMAGE,
      inLanguage: "en",
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function headBlock(path, posts = []) {
  const meta = pageMeta(path, posts);
  const url = `${SITE}${path === "/" ? "/" : path}`;
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const type = path.startsWith("/blog/") ? "article" : "website";
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="author" content="${NAME}" />`,
    `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:site_name" content="${NAME}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${IMAGE}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:creator" content="@maanas_tyagi" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(path, posts)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export { SUMMARY, profile, experience, projects, ossContributions, freelanceProjects, articles, publications };
