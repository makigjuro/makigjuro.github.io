---
title: 'Hello, world'
description: 'Why I am (re)starting this blog.'
pubDate: '2026-11-05'
draft: true
---

This is a starter post. It is marked `draft: true`, so it shows up when you run
`npm run dev` but is **not** published on the live site.

Edit this text, then remove the `draft: true` line (or set it to `false`) to publish it.

## Writing posts

- Every post is a Markdown (`.md`) or MDX (`.mdx`) file in `src/content/blog/`.
- The file name becomes the URL: `hello-world.md` → `/blog/hello-world/`.
- Code blocks get syntax highlighting:

```csharp
app.MapGet("/", () => "Hello from .NET!");
```
