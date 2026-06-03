import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import path from 'node:path'

type UpdatedMeta = {
  date: Date
  commit: string
}

const commitShaPattern = /^[0-9a-f]{7,40}$/i

const repositoryRootPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const updatedMetadataCache = new Map<string, UpdatedMeta | undefined>()
const changedHtmlFileCountCache = new Map<string, number>()
const changedMdxFileCountCache = new Map<string, number>()

const commitSearchLimit = 500
const highVolumeHtmlCommitThreshold = 250
const highVolumeMdxCommitThreshold = 5

function getCommitEntriesForPath(targetPath: string) {
  try {
    const gitLogResult = execFileSync(
      'git',
      ['log', `--max-count=${commitSearchLimit}`, '--format=%H%x00%cI', '--', targetPath],
      {
        cwd: repositoryRootPath,
        encoding: 'utf8',
      },
    ).trim()

    return gitLogResult ? gitLogResult.split(/\r?\n/) : []
  } catch {
    return []
  }
}

function getChangedFileCount(
  commitSha: string,
  changeScopePath: string,
  targetFileExtension: '.html' | '.mdx',
  changedFileCountCache: Map<string, number>,
) {
  if (changedFileCountCache.has(commitSha)) {
    return changedFileCountCache.get(commitSha) ?? 0
  }

  try {
    const changedFileList = execFileSync(
      'git',
      ['diff-tree', '--no-commit-id', '--name-only', '-r', commitSha, '--', changeScopePath],
      {
        cwd: repositoryRootPath,
        encoding: 'utf8',
      },
    ).trim()

    const changedTargetFiles = changedFileList
      ? changedFileList
          .split(/\r?\n/)
          .filter((changedFilePath) => changedFilePath.endsWith(targetFileExtension))
      : []

    const changedFileCount = changedTargetFiles.length

    changedFileCountCache.set(commitSha, changedFileCount)

    return changedFileCount
  } catch {
    // Fail closed: if a commit cannot be inspected, skip it.
    changedFileCountCache.set(commitSha, Number.POSITIVE_INFINITY)

    return Number.POSITIVE_INFINITY
  }
}

function getCollectionUpdated(collectionCategory: string, componentSlug: string) {
  const cacheKey = `${collectionCategory}/${componentSlug}`
  const componentExamplesPath = `public/examples/${collectionCategory}/${componentSlug}`
  const componentContentPath = `src/content/collection/${collectionCategory}/${componentSlug}.mdx`

  if (updatedMetadataCache.has(cacheKey)) {
    return updatedMetadataCache.get(cacheKey)
  }

  let updatedMetadata: UpdatedMeta | undefined

  const commitSearchTargets = [
    {
      targetPath: componentExamplesPath,
      countScopePath: 'public/examples',
      targetFileExtension: '.html' as const,
      changedFileCountCache: changedHtmlFileCountCache,
      highVolumeCommitThreshold: highVolumeHtmlCommitThreshold,
    },
    {
      targetPath: componentContentPath,
      countScopePath: 'src/content/collection',
      targetFileExtension: '.mdx' as const,
      changedFileCountCache: changedMdxFileCountCache,
      highVolumeCommitThreshold: highVolumeMdxCommitThreshold,
    },
  ]

  for (const commitSearchTarget of commitSearchTargets) {
    const commitEntries = getCommitEntriesForPath(commitSearchTarget.targetPath)

    for (const commitEntry of commitEntries) {
      const [commitSha, commitDate] = commitEntry.split('\x00')

      if (!commitSha || !commitDate) {
        continue
      }

      if (!commitShaPattern.test(commitSha)) {
        continue
      }

      const changedFileCount = getChangedFileCount(
        commitSha,
        commitSearchTarget.countScopePath,
        commitSearchTarget.targetFileExtension,
        commitSearchTarget.changedFileCountCache,
      )

      if (changedFileCount >= commitSearchTarget.highVolumeCommitThreshold) {
        continue
      }

      updatedMetadata = {
        commit: commitSha,
        date: new Date(commitDate),
      }

      break
    }

    if (updatedMetadata) {
      break
    }
  }

  updatedMetadataCache.set(cacheKey, updatedMetadata)

  return updatedMetadata
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
