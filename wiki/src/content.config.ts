import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const verification = z.enum(['confirmed', 'patch-sensitive', 'observed', 'inferred', 'strategy']);
const pageType = z.enum(['overview', 'guide', 'mechanic', 'reference', 'strategy']);

const sharedSchema = z.object({
  title: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string().min(20).max(240),
  category: z.string().min(2),
  pageType,
  patch: z.string(),
  verification,
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  order: z.number().int().nonnegative(),
  aliases: z.array(z.string()).default([]),
  relatedPages: z.array(z.string()).default([]),
  sources: z.array(z.string()).min(1),
  legacyHash: z.string().optional(),
  infobox: z.record(z.string(), z.string()).optional(),
  media: z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional()
  }).optional()
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/articles' }),
  schema: sharedSchema
});

const categoryIntros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/categories' }),
  schema: sharedSchema
});

export const collections = { articles, categoryIntros };
