import { Link } from "react-router-dom";
import { posts } from "../blog/posts";
import { articles } from "../data/content";

export default function Blog() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold text-[var(--text)]">Blog</h1>
      <section className="flex flex-col gap-3">
        <h2 className="font-mono-tag text-sm text-[var(--accent)]">Articles on X</h2>
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {articles.map((a) => (
            <a key={a.url} href={a.url} target="_blank" rel="noreferrer" className="group py-4">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium text-[var(--text)] group-hover:text-[var(--accent)]">{a.title}</h3>
                <span className="font-mono-tag whitespace-nowrap text-xs text-[var(--text-dim)]">{a.date}</span>
              </div>
              <p className="mt-1 font-mono-tag text-xs text-[var(--text-dim)]">{a.views}</p>
            </a>
          ))}
        </div>
      </section>
      {posts.length === 0 && <p className="text-[var(--text-dim)]">No posts yet.</p>}
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {posts.map((post) => (
          <Link key={post.slug} to={`/blog/${post.slug}`} className="group py-5">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-medium text-[var(--text)] group-hover:text-[var(--accent)]">
                {post.title}
              </h2>
              <span className="font-mono-tag whitespace-nowrap text-xs text-[var(--text-dim)]">{post.date}</span>
            </div>
            {post.summary && <p className="mt-1 text-sm text-[var(--text-dim)]">{post.summary}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
