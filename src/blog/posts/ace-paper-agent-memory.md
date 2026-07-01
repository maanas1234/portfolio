---
title: "ACE: The Agent Memory Paper That Actually Gets It Right"
date: 2026-07-02
description: Most agent memory systems suffer from Brevity Bias and Context Collapse. The ACE paper takes a different approach — and it's one of the most interesting ideas I've read recently.
---

I finished reading the [ACE paper](https://arxiv.org/abs/2510.04618) this week. One of the most interesting things I've read recently on agent memory.

Most memory systems suffer from two problems that rarely get named properly. ACE names them.

## Brevity Bias

The more you optimize a prompt, the shorter and more generic it tends to become.

Over time, valuable strategies, edge cases, and domain-specific knowledge get compressed away. What you end up with is a tighter prompt that has quietly forgotten everything that made it useful.

## Context Collapse

As new information arrives, agents often summarize existing context to make room.

The problem: every summarization loses information. Do this repeatedly, and the agent eventually forgets important details that were present at the start. The context window becomes a lossy pipe, not a memory.

## ACE's Solution: Incremental Delta Updates

Instead of repeatedly rewriting the entire memory, ACE only stores the *delta* — the new knowledge gained from each interaction:

- A useful strategy
- A lesson from a failure
- Domain-specific knowledge
- A reusable workflow

You're not touching what already exists. You're only appending what's genuinely new.

## Grow & Refine

The second idea I liked: rather than aggressively compressing memory, ACE lets context grow naturally and periodically removes *redundant* information through similarity matching.

Two modes:
- **Proactive** — runs after every delta update
- **Lazy** — runs only when context limits are reached

This is a much more surgical approach than the usual "summarize everything and hope for the best."

## The Architecture: Generator → Reflector → Curator

The system is built around three components, each with a distinct job:

- **Generator** — creates new knowledge
- **Reflector** — learns from successes and failures
- **Curator** — organizes and deduplicates

And the cycle repeats. What I find compelling here is that generating, finding, and writing are treated as equally important tasks — each gets its own dedicated model. That's not just architecturally clean, it's the right intuition. These are genuinely different cognitive operations.

## The Bigger Takeaway

Most approaches treat context as something that needs to be *compressed*.

ACE treats context as something that can *evolve*.

As context windows continue to grow, that feels like a much more natural direction. Compression is a workaround for a hardware constraint. Evolution is an actual design philosophy.

I'm thinking of doing some follow-up work on this. The Grow & Refine mechanism in particular feels like it has room to be pushed further — especially in long-horizon tasks where the agent's knowledge base shifts significantly over time.

Genuinely one of the better papers I've read this year.
