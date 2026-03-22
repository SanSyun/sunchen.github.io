# Personal Publication Site

A minimal publication-style personal website built with Astro and Markdown. It is designed for:

- project case studies
- technical notes
- future resume links
- low-maintenance deployment to GitHub Pages or a server

## Why this stack

- Write content directly in VS Code with Markdown
- Keep everything in Git
- Generate a fast static site
- Deploy easily to GitHub Pages
- Migrate later to your own Linux server if needed

## Project structure

```text
src/
  components/
  content/
    zh-notes/
    zh-projects/
    en-notes/
    en-projects/
  layouts/
  pages/
public/
```

## Local development

Node.js is not installed in the current environment, so dependencies were not installed here.
Once Node.js 20+ is available, run:

```bash
npm install
npm run dev
```

## Writing new content

Create Markdown files in these folders:

- `src/content/zh-projects/`
- `src/content/zh-notes/`
- `src/content/en-projects/`
- `src/content/en-notes/`

Each file should include frontmatter like:

```md
---
title: "Article title"
description: "One-sentence summary"
date: "2026-03-21"
draft: false
tags: ["tag-one", "tag-two"]
---
```

## Deploy to GitHub Pages

This project is already configured for GitHub Pages via GitHub Actions.

### Recommended repository naming

- Best option: create a repository named `<your-github-name>.github.io`
- Alternate option: keep any repository name and the site will publish under `/<repo-name>/`

### GitHub setup

1. Push this project to a GitHub repository.
2. In the repository, open `Settings -> Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.
4. Optional but recommended: in `Settings -> Secrets and variables -> Actions -> Variables`, add:
   - `SITE_URL` = your final public URL

### Local commands

```bash
npm install
npm run build
```

### Notes

- If your repository name is not `<your-github-name>.github.io`, Astro will automatically use the repository name as the base path during GitHub Actions deployment.
- If you later bind a custom domain, set `SITE_URL` to that domain.

## Suggested next steps

1. Add your real project case studies under `src/content/zh-projects/`.
2. Keep Chinese as the default site and maintain English content under `/en`.
3. Add a dedicated `/resume` page.
4. Push to GitHub and enable GitHub Pages.
