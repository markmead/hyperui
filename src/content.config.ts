import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const page = defineCollection({
  loader: glob({
    base: './src/content/about',
    pattern: '**/*.{md,mdx}',
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
    }),
})

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      emoji: z.string(),
      terms: z.array(z.string()),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date(),
    }),
})

const collection = defineCollection({
  loader: glob({
    base: './src/content/collection',
    pattern: '{application,marketing}/**/*.{md,mdx}',
  }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string(),
      category: z.enum(['marketing', 'application']),
      emoji: z.string(),
      tag: z.enum(['new', 'updated']).optional(),
      wrapper: z.string().default('h-[600px]'),
      terms: z.array(z.string()),
      pubDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      components: z.array(
        z.object({
          title: z.string(),
          contributors: z.array(z.string()).default(['markmead']),
          plugins: z.array(z.string()).optional(),
          dark: z
            .union([
              z.boolean(),
              z.object({
                contributors: z.array(z.string()).default(['markmead']),
              }),
            ])
            .optional(),
        })
      ),
    }),
})

export const collections = { page, blog, collection }
