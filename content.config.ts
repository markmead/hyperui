import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const componentCollectionSchema = {
  title: z.string(),
  description: z.string(),
  emoji: z.string(),
  tag: z.string().optional(),
  container: z.string().optional(),
  wrapper: z.string().optional(),
  terms: z.array(z.string()).optional(),
  components: z.array(
    z.object({
      title: z.string(),
      dark: z.boolean().optional(),
      container: z.string().optional(),
      creator: z.string().optional(),
    })
  ),
}

export default defineContentConfig({
  collections: {
    about: defineCollection({
      type: 'page',
      source: 'about/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        // We only need this for the `/about/faqs` page
        faqs: z
          .array(
            z.object({
              question: z.string(),
              answer: z.string(),
            })
          )
          .optional(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        emoji: z.string(),
        date: z.string(),
        tag: z.string().optional(),
        terms: z.array(z.string()).optional(),
      }),
    }),
    components: defineCollection({
      type: 'page',
      source: 'components/*.md',
      schema: z.object({
        title: z.string(),
        subtitle: z.string(),
        description: z.string(),
        emoji: z.string(),
      }),
    }),
    application: defineCollection({
      type: 'page',
      source: 'components/application/*.md',
      schema: z.object({ ...componentCollectionSchema }),
    }),
    marketing: defineCollection({
      type: 'page',
      source: 'components/marketing/*.md',
      schema: z.object({ ...componentCollectionSchema }),
    }),
  },
})
