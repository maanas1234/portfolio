import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Nav from "./Nav";
import RoamingCat from "./RoamingCat";
import { posts } from "../blog/posts";
import { pageMeta, SITE } from "../data/seo";

function setMeta(selector, tag, attrs, value) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute(el.tagName === "LINK" ? "href" : "content", value);
}

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const meta = pageMeta(path, posts);
    if (!meta) return;
    const url = `${SITE}${path}`;
    document.title = meta.title;
    setMeta('meta[name="description"]', "meta", { name: "description" }, meta.description);
    setMeta('link[rel="canonical"]', "link", { rel: "canonical" }, url);
    setMeta('meta[property="og:title"]', "meta", { property: "og:title" }, meta.title);
    setMeta('meta[property="og:description"]', "meta", { property: "og:description" }, meta.description);
    setMeta('meta[property="og:url"]', "meta", { property: "og:url" }, url);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">{children}</main>
      <footer className="border-t border-[var(--border)] py-6 text-center font-mono-tag text-xs text-[var(--text-dim)]">
        © {new Date().getFullYear()} Maanas Tyagi
      </footer>
      <RoamingCat />
    </div>
  );
}
