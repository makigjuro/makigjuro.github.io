# makigjuro.github.io

Marjan Gjuroski's blog, built with [Astro](https://astro.build) and deployed to
https://makigjuro.github.io by GitHub Actions on every push to `master`.

## Write a post

1. Create `src/content/blog/my-post.md`:

   ```md
   ---
   title: 'My post'
   description: 'One-line summary'
   pubDate: '2026-11-05'
   draft: true   # remove when ready to publish
   ---

   Post content in Markdown...
   ```

2. Preview locally: `npm run dev`, then open http://localhost:4321 (drafts are visible here).
3. Remove `draft: true`, then commit and push. The site updates in about a minute.

Images go in `src/assets/` and can be referenced with `heroImage: '../../assets/pic.jpg'`.

## Commands

| Command           | Action                              |
| ----------------- | ----------------------------------- |
| `npm install`     | Install dependencies                |
| `npm run dev`     | Local dev server at `localhost:4321` |
| `npm run build`   | Build the production site to `dist/` |
| `npm run preview` | Preview the production build        |

The old 2018 Jekyll site is kept on the `jekyll-2018-backup` branch.
