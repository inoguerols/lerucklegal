import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const actualidad = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/actualidad" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { actualidad };
