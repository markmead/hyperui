import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.{md,mdx}',
    retainBody: true,
  }),
  schema: () =>
    z.object({
      description: z.string(),
      pubDate: z.coerce.date(),
      slug: z.string(),
      terms: z.array(z.string()),
      title: z.string(),
      updatedDate: z.coerce.date(),
    }),
})

const collection = z.object({
  description: z.string(),
  slug: z.string(),
  terms: z.array(z.string()),
  title: z.string(),
  wrapper: z.string().default('h-[600px]'),
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
    }),
  ),
})

const application = defineCollection({
  loader: glob({
    base: './src/content/collection/application',
    pattern: '**/*.{md,mdx}',
    retainBody: false,
  }),
  schema: collection.extend({
    category: z.literal('application'),
  }),
})

const marketing = defineCollection({
  loader: glob({
    base: './src/content/collection/marketing',
    pattern: '**/*.{md,mdx}',
    retainBody: false,
  }),
  schema: collection.extend({
    category: z.literal('marketing'),
  }),
})

const neobrutalism = defineCollection({
  loader: glob({
    base: './src/content/collection/neobrutalism',
    pattern: '**/*.{md,mdx}',
    retainBody: false,
  }),
  schema: collection.extend({
    category: z.literal('neobrutalism'),
  }),
})

export const collections = { blog, application, marketing, neobrutalism }
