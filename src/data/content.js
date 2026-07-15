export const profile = {
  name: "Maanas Tyagi",
  tagline: "AI Engineer. Occasional Researcher.",
  bio: [
    "I'm an I.T. undergraduate student. I love the field of deep learning and am a sucker for transformers. I have worked with Fortune 500 companies, building automations for them.",
    "Most of my time goes into LLM applications and agentic systems: RAG pipelines, corrective retrieval, local-first tools that don't need the cloud to be useful.",
    "Lately I've been getting into AI systems design — how all the pieces actually connect: models, memory, tools, and orchestration into something that works end to end.",
    "I've published a preprint on positional bias in peer review, and have a second paper — on why LLM agents get lazier the longer they talk — under review.",
    "30+ repos on GitHub, contributor to Hugging Face, and a habit of turning weird personal observations into actual experiments.",
    "I also freelance on the side — AI and automation builds for whoever needs one.",
    "I think of myself as someone who wants to understand everything precisely enough to rebuild it from scratch, and won't stop until the proof, the product, or the paycheck confirms he actually did.",
  ],
  email: "maanastyagi2006@gmail.com",
  socials: [
    { label: "GitHub", url: "https://github.com/maanas1234" },
    { label: "LinkedIn", url: "https://linkedin.com/in/maanas-tyagi-1b955b23b" },
    { label: "X", url: "https://x.com/maanas_tyagi" },
    { label: "Email", url: "mailto:maanastyagi2006@gmail.com" },
  ],
};

export const experience = [
  {
    role: "AI & Analytics Intern",
    org: "Genpact",
    location: "Jaipur, India",
    period: "May 2026 – Present",
    bullets: [
      "Replaced a $3,000 licensed reconciliation tool with a custom Python automation pipeline — cut processing time for 10,000-row files from 30+ minutes to under 5",
      "Built purchase, invoice, and GRNI reconciliation engines for Fortune 500 clients, turning manual pivot-table work into a single-file upload with instant, fully cross-matched output",
    ],
  },
  {
    role: "Content Lead",
    org: "Chryme Quilt",
    location: "Remote",
    period: "Jun 2025 – Nov 2025",
    bullets: [
      "Led end-to-end content strategy for Chryme Quilt and its clients — calendars, copy, and campaigns across LinkedIn and Instagram",
      "Grew Chryme Quilt's LinkedIn presence through consistent, story-driven posting and closer collaboration with the design and writing teams",
    ],
  },
  {
    role: "Management Intern",
    org: "Labour Law Advisor",
    location: "On-site",
    period: "May 2025 – Jun 2025",
    bullets: [
      "Helped plan and run Jagruk Fest — sponsor outreach, volunteer recruitment, and on-ground coordination of a 20-person team",
      "Designed event collateral and social content to drive turnout and visibility",
    ],
  },
  {
    role: "Content Writer",
    org: "Astute",
    location: "Remote",
    period: "Feb 2025 – Mar 2025",
    bullets: [
      "Led the social media team — content strategy, scheduling, and execution across platforms",
      "Wrote LinkedIn posts and web copy, plus a performance report tracking Instagram engagement and growth",
    ],
  },
];

export const projects = [
  {
    name: "RAG Eval System",
    repo: "https://github.com/maanas1234/RAG-Eval-System",
    stack: ["LangChain", "Chroma", "BM25", "RAGAS", "sentence-transformers", "Python"],
    bullets: [
      "Hybrid-retrieval RAG system built to practice rigorous evaluation, not just a working pipeline — Precision@k / Recall@k / MRR for retrieval, RAGAS (faithfulness, answer relevancy, context precision/recall) for generation, scored separately against a 33-query hand-labeled eval set",
      "Found and fixed a real bug in LangChain's MultiQueryRetriever dedup logic (compared full Document equality across sub-retrievers with mismatched id fields), which was silently inflating retrieved-set size and producing an impossible recall@k of 1.15",
      "Ran a full ablation series to justify every design choice: dropping multi-query retrieval matched or beat it on every metric while halving LLM calls per query; a BM25-vs-semantic-vs-hybrid comparison showed semantic-only beating the hybrid default on every retrieval metric (Recall@5 0.848 vs 0.818, MRR 0.703 vs 0.610)",
    ],
  },
  {
    name: "Lumen Research",
    repo: "https://github.com/maanas1234/Lumen-Research",
    stack: ["FastAPI", "React", "FAISS", "Ollama", "RAG", "Python"],
    bullets: [
      "Local-first AI research paper reader — upload PDFs up to 100+ pages, chat with content, highlight text for ELI5 / mathematical / step-by-step explanations",
      "RAG pipeline: PyMuPDF extraction → sliding window chunking → Ollama embeddings → FAISS cosine similarity → streamed LLM response",
      "Zero cloud dependency via Ollama; deep-dive threads with isolated memory, auto-summaries, and multi-mode explanations",
    ],
  },
  {
    name: "Corrective RAG (CRAG)",
    repo: "https://github.com/maanas1234/Corrective-Rag",
    stack: ["LangGraph", "LangChain", "Python", "FAISS"],
    bullets: [
      "Implemented full Corrective Retrieval-Augmented Generation (CRAG) pipeline with document grading, web fallback, and query rewriting",
      "State machine: retrieval → grade → correct/rewrite → generate; handles retrieval failure gracefully via web search fallback",
    ],
  },
  {
    name: "Concept Mapper",
    repo: "https://github.com/maanas1234/Concept_Mapper",
    stack: ["Flask", "Three.js", "OpenRouter API"],
    period: "January 2026",
    bullets: [
      "Knowledge visualization tool mapping conceptual relationships as an interactive 3D graph; built as a one-week sprint",
      "LLM-powered concept extraction via OpenRouter API; full-stack Python/Flask backend + vanilla JS + Three.js frontend",
    ],
  },
  {
    name: "Claude Usage Meter",
    repo: "https://github.com/maanas1234/claude-usage-meter",
    stack: ["Electron", "JavaScript", "HTML", "CSS"],
    bullets: [
      "Windows tray widget showing live progress on Claude.ai's 5-hour session limit and rolling 7-day limit, with reset countdowns for each",
      "Keeps a hidden, persistent signed-in session and polls the same internal usage endpoint claude.ai's own UI uses — everything stays on-device, no third-party server",
      "Packaged as a one-click Windows installer via electron-builder",
    ],
  },
  {
    name: "Groove",
    repo: "https://github.com/maanas1234/groove",
    stack: ["Flutter", "Dart"],
    bullets: [
      "Fog-of-war exploration app — the map starts greyed out and permanently reveals as you physically walk or drive through it, GTA-style",
      "Built a custom lat/lng quantization grid in pure Dart after the standard H3 hex-grid library broke via native FFI on Android, with line-interpolation between GPS fixes so roads reveal continuously instead of leaving gaps",
      "Persistent background tracking via chained Android WorkManager tasks (bypassing the OS's 15-minute task floor), plus Google Timeline import and Mapillary street-imagery lookup",
    ],
  },
  {
    name: "Todoist Agent",
    repo: "https://github.com/maanas1234/todoist-agent",
    stack: ["Python", "OpenRouter API", "Twilio", "Railway"],
    bullets: [
      "WhatsApp bot that manages your Todoist tasks via natural language, powered by DeepSeek through OpenRouter",
      "Deployed on Railway as a personal daily-driver agent",
    ],
  },
];

export const freelanceProjects = [
  {
    name: "RAG Chatbot with Email Escalation",
    stack: ["n8n", "OpenAI", "Pinecone", "PostgreSQL", "Google Drive API", "Gmail API"],
    period: "Oct 2025 – Nov 2025",
    bullets: [
      "End-to-end RAG chatbot for internal company docs — auto-ingests files from Google Drive, chunks and embeds them into Pinecone, and answers queries grounded in the actual documents",
      "Maintains conversation memory in PostgreSQL; if a user asks to speak to a human, the agent collects their email and fires a summarized conversation thread via Gmail — no manual handoff needed",
    ],
  },
  {
    name: "Resume Screener Agent",
    stack: ["n8n", "OpenAI", "Groq", "PDF.co", "JavaScript", "Webhooks"],
    period: "Jul 2025 – Sep 2025",
    bullets: [
      "Webhook-triggered pipeline that parses resumes and job descriptions from PDFs, then runs multiple AI agents to score candidates across keyword match, seniority, experience, and impact signals",
      "Each dimension scores independently and aggregates into a final hire/no-hire recommendation with evidence — output is structured and recruiter-ready, not just a keyword hit count",
    ],
  },
  {
    name: "Business Lead Scraper & AI Enrichment",
    stack: ["n8n", "SerpAPI", "Google Gemini", "Google Sheets", "JavaScript"],
    period: "Aug 2025",
    bullets: [
      "Scrapes local business listings from Google Search via SerpAPI based on user-defined queries and locations, extracting name, category, contact, and hours into Google Sheets",
      "For businesses with websites, automatically visits, strips boilerplate, and runs the clean text through Gemini to generate a concise sales-ready summary — the entire enrichment loop runs without manual input",
    ],
  },
  {
    name: "GST Reconciliation Tool",
    stack: ["Python", "Pandas", "Streamlit", "openpyxl"],
    bullets: [
      "Built for a CA firm to automate GSTR-2A/2B reconciliation against purchase registers during audits — cut manual effort by 70%",
      "Handles messy, real-world data: normalizes GST numbers, flags mismatches, and exports a clean audit-ready report in one click",
    ],
  },
  {
    name: "Custom CRM",
    stack: ["HTML", "CSS", "JavaScript", "Supabase"],
    bullets: [
      "Role-based CRM built for a client company — the admin assigns each employee a role that determines exactly what they can see and do (a designer has no access to financials, for instance)",
      "Architected to scale across growing teams without restructuring: adding a new employee or role is a config change, not a code change",
    ],
  },
];

export const publications = [
  {
    title:
      "Instruction Fidelity Decay in Small Language Model Agents: Semantic Recall Dissociates from Format Compliance Under Semantic Interference",
    status: "Under review",
    description:
      "Investigated how agents degrade when a Small Language Model (SLM) acts as the reasoning brain under varying levels of semantic noise and context interference.",
    url: null,
  },
  {
    title: "Front-Loading Bias in Large Language Models: A Multi-Model Empirical Analysis",
    status: "ResearchGate preprint",
    description:
      "Originated from a personal observation: in multi-point LLM replies, models like ChatGPT consistently generate fewer words per point as the response grows — formalized into an empirical study across GPT, Gemini, and Claude.",
    url: "https://doi.org/10.13140/RG.2.2.32504.92164",
  },
];
