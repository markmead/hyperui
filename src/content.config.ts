import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { fileURLToPath } from 'node:url'

import fs from 'node:fs'
import path from 'node:path'

type UpdatedMeta = {
  date: Date
  commit: string
}

const repositoryRootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

let gitMetadata: Record<string, { commit: string; date: string }> = {}

try {
  const metadataPath = path.resolve(repositoryRootPath, 'src/data/git-metadata.json')

  if (fs.existsSync(metadataPath)) {
    gitMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'))
  }
} catch {
  // We do nothing
}

function getCollectionUpdated(
  collectionCategory: string,
  componentSlug: string,
): UpdatedMeta | undefined {
  const cacheKey = `${collectionCategory}/${componentSlug}`

  if (gitMetadata[cacheKey]) {
    return {
      commit: gitMetadata[cacheKey].commit,
      date: new Date(gitMetadata[cacheKey].date),
    }
  }

  return undefined
}

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: '**/*.mdx',
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
  pattern: z.url().optional(),
  components: z.array(
    z.object({
      contributors: z.array(z.string()).default(['markmead']),
      description: z.string().optional(),
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

function createCollection(
  collectionCategory: 'application' | 'marketing' | 'neobrutalism',
  sourceBasePath: string,
) {
  return defineCollection({
    loader: glob({
      base: sourceBasePath,
      pattern: '**/*.mdx',
      retainBody: false,
    }),
    schema: collection
      .extend({
        category: z.literal(collectionCategory),
      })
      .transform((collectionData) => ({
        ...collectionData,
        updated: getCollectionUpdated(collectionCategory, collectionData.slug),
      })),
  })
}

const application = createCollection('application', './src/content/collection/application')
const marketing = createCollection('marketing', './src/content/collection/marketing')
const neobrutalism = createCollection('neobrutalism', './src/content/collection/neobrutalism')

export const collections = { blog, application, marketing, neobrutalism }
