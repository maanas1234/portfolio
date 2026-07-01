---
title: PewDiePie Just Launched a Free AI Workspace That Runs Entirely on Your Computer — And It's a Big Deal
date: 2026-07-01
description: Felix Kjellberg shipped Odysseus — a free, open-source, local-first AI workspace. 30k GitHub stars in 48 hours. Here's what it is and how to use it.
---

Felix Kjellberg — yes, PewDiePie, the used-to-be-most-subscribed human in YouTube history — just shipped something genuinely interesting. Not a merch drop. Not a gaming video. A full, free, open-source AI workspace called **Odysseus**, launched on May 31, 2026.

In under 48 hours, it crossed 30,000+ GitHub stars.

Here's what it is, why it matters, and how to actually use it.

## What Is Odysseus?

Odysseus is a self-hosted AI workspace. Think of it as the interface you get from ChatGPT or Claude — but installed and running entirely on your own machine.

Its tagline: *"Local-first, privacy-first, and no telemetry. Just you and your models."*

No subscriptions. No cloud. No data handed over to anyone.

It bundles a lot into one place:

- Chat with any local or cloud AI model
- Autonomous AI agents
- Web research tools
- Email management
- Document handling
- Memory systems
- Shell command access

PewDiePie spent roughly a year building this, openly documenting his process — from fine-tuning a Qwen 32B model in early 2026 (which reportedly outperformed GPT-4o on a coding benchmark) to building out the full workspace. The launch video was titled "MY trillion $Dollar Project is finally OUT!" — classic Felix energy, but the project itself is serious.

## Why Does This Exist?

The privacy argument is the core of it.

Every conversation you have with ChatGPT, Claude, or Gemini travels to a company's servers. It gets processed there. Often retained. PewDiePie's take:

> "I built Odysseus because I believe in privacy and self-hosting. It's about the principle. If maybe you don't care about your private data, the reality is these companies abuse it."

Odysseus solves this by keeping everything on your hardware. Your conversations, your files, your data — none of it leaves your machine unless you choose to connect an external API.

And if you still want to use Claude or OpenAI? You can. Just plug in your API key and point it at those models. You're in control of where the request goes.

## How to Install It

Installation is straightforward. The one important thing to get right upfront: install it in a normal user directory, not a system-protected folder. On Windows, that means something like `C:\Users\YourName\Projects\odysseus` — not `C:\Windows\System32`. Learned that the hard way.

**Step 1: Clone the repository**

```bash
git clone https://github.com/pewdiepie-archdaemon/odysseus.git
cd odysseus
```

**Step 2 (Windows): Launch it**

```powershell
powershell -ExecutionPolicy Bypass -File .\launch-windows.ps1
```

**Step 2 (macOS): Launch it**

```bash
./start-macos.sh
```

**Step 3: Open your browser**

Go to `http://localhost:7000` (Windows) or `http://127.0.0.1:7860` (macOS) and the interface should appear.

## Connecting Your First AI Model

You have two paths:

**Path A — Local Models (via Ollama)**

If you want true privacy with no external calls, install Ollama first and pull a model:

```bash
ollama serve
ollama pull qwen3:1.7b
```

Then in Odysseus, point it at your local Ollama endpoint. Models like Qwen3, Gemma 3, and Llama variants all work well. On an RTX 3050 4GB GPU, Qwen3 1.7B runs responsively with all layers offloaded to the GPU.

**Path B — Cloud APIs**

If you'd rather use a powerful cloud model, just add your API key in the settings. Odysseus supports most major providers. Once added, all available models from that provider appear automatically.

You can even run both — use a small local model for quick tasks and a cloud model for heavier lifting.

## The Agent Mode — Where It Gets Interesting

The regular chat mode works like any AI assistant. But toggle over to Agent mode and the tool becomes something different.

An agent in Odysseus can:

- Search the web
- Read and write files
- Use memory across sessions
- Execute shell commands
- Complete multi-step tasks without you prompting each step

You control exactly what the agent can access through the settings panel. Give it access to email and web search, and it can research a topic, draft a response, and file it — all in one go.

The built-in tools cover a lot of ground: Brain, Calendar, Compare, Cookbook, Deep Research, Gallery, Library, Notes, Tasks. You can also add long-term memory, connect emails, MCP servers, and custom URLs.

## Performance Tips

Running local models is genuinely useful, but context size and tool usage are where things slow down — not the inference speed itself. A few things that make a meaningful difference:

- Use smaller models for web search summarization tasks
- Disable reasoning mode when you don't need it
- Keep context windows lean
- Make sure models stay loaded in memory (`ollama ps`) instead of reloading on every request

## Common Issues and Fixes

**Port already in use?** Another instance of Odysseus is likely already running. Check before launching a second copy.

**Permission errors on Windows?** This almost always means it's installed somewhere protected. Move the folder to your user directory.

**Ollama not found?** Run `ollama serve` in a separate terminal window before launching Odysseus. Confirm your models are ready with `ollama list`.

## The Bigger Picture

Odysseus isn't the most polished tool out there. It's v1.0. You'll hit rough edges. You'll probably spend some time in config files.

But the idea it represents is worth paying attention to: a single environment where models, memory, documents, research tools, email, and agents all live together — on hardware you own.

That's a fundamentally different relationship with AI than renting access to a chatbot through a subscription.

PewDiePie put it simply: *"No sales team, no demo request, no Trojan horse."* Download it, run it, modify it if you want.

The GitHub repo is live at [github.com/pewdiepie-archdaemon/odysseus](https://github.com/pewdiepie-archdaemon/odysseus).

---

Have you tried Odysseus yet? Running local models or sticking with cloud APIs?
