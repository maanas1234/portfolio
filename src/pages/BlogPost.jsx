import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost } from "../blog/posts";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <article className="flex flex-col gap-2">
      <Link to="/blog" className="font-mono-tag text-xs text-[var(--text-dim)] hover:text-[var(--accent)]">
        ← back to blog
      </Link>
      <h1 className="mt-2 text-2xl font-semibold text-[var(--text)]">{post.title}</h1>
      <p className="font-mono-tag mb-4 text-xs text-[var(--text-dim)]">{post.date}</p>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
