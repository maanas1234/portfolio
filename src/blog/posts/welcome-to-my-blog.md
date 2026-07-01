---
title: "Welcome to my blog"
date: "2026-06-29"
summary: "First post — how this blog works and what I'll be writing about."
---

This is the first post on my site. No backend, no database — every post here is just a Markdown file in `src/blog/posts/`.

## How to publish a new post

1. Add a new `.md` file to `src/blog/posts/`.
2. Give it frontmatter at the top:

```
---
title: "My Post Title"
date: "2026-07-01"
summary: "One-line summary shown in the blog list."
---
```

3. Write the post body in Markdown below the frontmatter.
4. Commit and push — the site picks it up automatically on the next build.

That's it. What I'll write about: notes from building RAG and agentic systems, observations from LLM behavior research, and whatever I'm stuck debugging that week.
