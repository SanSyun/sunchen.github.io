---
title: "Personal Blog Launch System"
description: "Designed and implemented a publication-style personal site to present projects, notes, and long-form writing for future job applications."
date: "2026-03-21"
draft: false
featured: true
tags: ["portfolio", "writing", "frontend"]
readingTime: "6 min read"
role: "Product designer and frontend engineer"
duration: "Solo project, phase one"
stack: ["Astro", "Markdown", "TypeScript", "CSS"]
outcome: "Created a reusable publishing foundation"
links:
  repo: "https://github.com/example/person-page"
---

## Background

I wanted a site that could work both as a personal archive and as a professional artifact. The
goal was not only to publish articles, but to make those articles useful during job applications.

That changed the design brief. The site needed to feel composed and trustworthy, while still being
easy enough to update from VS Code in plain Markdown.

## What I built

The first version focuses on four content types:

- a home page that explains the purpose of the site
- a projects section written as case studies
- a notes section for technical writing and study logs
- an about page that supports resume and contact links

## Key decisions

### Markdown-first content

All long-form content lives in files rather than a database. This means the writing workflow stays
simple, version controlled, and easy to back up.

### Publication-style visual language

Instead of a typical portfolio hero, I used editorial cues:

- restrained color palette
- serif headlines
- structured metadata
- readable article layouts

### Hiring-friendly structure

Each project page is meant to answer the questions a hiring manager usually has:

- what problem was being solved
- what my role was
- what constraints mattered
- what changed because of the work

## Next steps

- add a dedicated resume page
- introduce tag pages and search
- prepare automated deployment to a Linux server
