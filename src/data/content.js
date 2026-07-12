export const profile = {
  name: "Maanas Tyagi",
  tagline: "AI Engineer. Occasional Researcher.",
  bio: [
    "I'm an I.T. undergraduate student. I love the field of deep learning and am a sucker for transformers. I have worked with Fortune 500 companies, building automations for them.",
    "Most of my time goes into LLM applications and agentic systems: RAG pipelines, corrective retrieval, local-first tools that don't need the cloud to be useful.",
    "I've published a preprint on positional bias in peer review, and have a second paper — on why LLM agents get lazier the longer they talk — under review.",
    "30+ repos on GitHub, one merged PR into Hugging Face Transformers, and a habit of turning weird personal observations into actual experiments.",
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
    name: "RAG Eval System",
    repo: "https://github.com/maanas1234/RAG-Eval-System",
    stack: ["Python", "LangChain", "ChromaDB", "BM25", "RAGAS", "OpenRouter"],
    bullets: [
      "Hybrid-retrieval RAG pipeline built specifically to practice the part most projects skip — rigorous evaluation; every architectural decision (k=5, dropping multi-query, semantic-only over hybrid) was driven by running ablations, not assumption",
      "Hand-labeled 33-query eval set from a personal 69-note Obsidian vault, including trap queries with no answer in the corpus to test whether the system hallucinates or admits it doesn't know",
      "Scores retrieval and generation independently — Precision@k, Recall@k, MRR for the retriever; faithfulness, answer relevancy, context precision, and context recall via RAGAS for the generator",
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
