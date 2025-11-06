import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const page = defineCollection({
  loader: glob({
    base: './src/content/about',
    pattern: '**/*.{md,mdx}',
  }),
  schema: () =>
    z.object({
      description: z.string(),
      pubDate: z.coerce.date(),
      slug: z.string(),
      title: z.string(),
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
      description: z.string(),
      emoji: z.string(),
      pubDate: z.coerce.date(),
      slug: z.string(),
      terms: z.array(z.string()),
      title: z.string(),
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
      category: z.enum(['application', 'marketing']),
      description: z.string(),
      emoji: z.string(),
      slug: z.string(),
      terms: z.array(z.string()),
      title: z.string(),
      wrapper: z.string().default('h-[600px]'),
      pubDate: z.coerce.date().optional(),
      tag: z.enum(['new', 'updated']).optional(),
      updatedDate: z.coerce.date().optional(),
      components: z.array(
        z.object({
          contributors: z.array(z.string()).default(['markmead']),
          title: z.string(),
          dark: z
            .union([
              z.boolean(),
              z.object({
                contributors: z.array(z.string()).default(['markmead']),
              }),
            ])
            .optional(),
          plugins: z.array(z.string()).optional(),
        })
      ),
    }),
})

export const collections = { page, blog, collection }
