import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  readingTime: z.string().optional(),
  featured: z.boolean().default(false)
});

const projectSchema = baseSchema.extend({
  role: z.string(),
  duration: z.string(),
  stack: z.array(z.string()).default([]),
  outcome: z.string(),
  links: z
    .object({
      demo: z.string().url().optional(),
      repo: z.string().url().optional()
    })
    .optional()
});

const noteSchema = baseSchema.extend({
  category: z.string()
});

export const collections = {
  "zh-projects": defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/zh-projects" }),
    schema: projectSchema
  }),
  "en-projects": defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/en-projects" }),
    schema: projectSchema
  }),
  "zh-notes": defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/zh-notes" }),
    schema: noteSchema
  }),
  "en-notes": defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/en-notes" }),
    schema: noteSchema
  })
};

