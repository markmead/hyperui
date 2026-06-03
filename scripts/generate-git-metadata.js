#!/usr/bin/env node

import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import fs from 'node:fs'
import path from 'node:path'

const commitShaPattern = /^[0-9a-f]{7,40}$/i
const scriptFilePath = fileURLToPath(import.meta.url)
const repositoryRootPath = path.resolve(path.dirname(scriptFilePath), '..')

const commitSearchLimit = 500
const highVolumeHtmlCommitThreshold = 250
const highVolumeMdxCommitThreshold = 10

const changedHtmlFileCountCache = new Map()
const changedMdxFileCountCache = new Map()

function getCommitEntriesForPath(targetPath) {
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
  commitSha,
  changeScopePath,
  targetFileExtension,
  changedFileCountCache,
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
    changedFileCountCache.set(commitSha, Number.POSITIVE_INFINITY)

    return Number.POSITIVE_INFINITY
  }
}

function getCollectionUpdated(collectionCategory, componentSlug) {
  const componentExamplesPath = `public/examples/${collectionCategory}/${componentSlug}`
  const componentContentPath = `src/content/collection/${collectionCategory}/${componentSlug}.mdx`

  let updatedMetadata

  const commitSearchTargets = [
    {
      targetPath: componentExamplesPath,
      countScopePath: 'public/examples',
      targetFileExtension: '.html',
      changedFileCountCache: changedHtmlFileCountCache,
      highVolumeCommitThreshold: highVolumeHtmlCommitThreshold,
    },
    {
      targetPath: componentContentPath,
      countScopePath: 'src/content/collection',
      targetFileExtension: '.mdx',
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
        date: commitDate, // Preserve ISO string directly for JSON
      }

      break
    }

    if (updatedMetadata) {
      break
    }
  }

  return updatedMetadata
}

function generateMetadata() {
  console.log(
    '🔍 Generating Git metadata for local collections (checking both MDX pages and HTML examples)...',
  )

  const collectionsDir = path.join(repositoryRootPath, 'src/content/collection')
  const collectionCategories = ['application', 'marketing', 'neobrutalism']

  const fileMetadata = {}

  for (const categoryItem of collectionCategories) {
    const categoryPath = path.join(collectionsDir, categoryItem)

    if (!fs.existsSync(categoryPath)) {
      continue
    }

    const collectionFiles = fs
      .readdirSync(categoryPath)
      .filter((fileItem) => fileItem.endsWith('.mdx'))
      .sort((a, b) => a.localeCompare(b))

    for (const fileItem of collectionFiles) {
      const collectionSlug = path.basename(fileItem, '.mdx')
      const mdxPath = `src/content/collection/${categoryItem}/${collectionSlug}.mdx`
      const htmlDir = `public/examples/${categoryItem}/${collectionSlug}`

      console.log(`📦 Analyzing: ${categoryItem}/${collectionSlug}`)
      console.log(`   ├─ MDX file: ${mdxPath}`)
      console.log(`   └─ HTML directory: ${htmlDir}`)

      const updatedInfo = getCollectionUpdated(categoryItem, collectionSlug)

      if (updatedInfo) {
        fileMetadata[`${categoryItem}/${collectionSlug}`] = updatedInfo
        console.log(
          `   ✨ Last updated commit: ${updatedInfo.commit.slice(0, 7)} on ${updatedInfo.date}\n`,
        )
      } else {
        console.log(`   ⚠️ No commit metadata found\n`)
      }
    }
  }

  const outputDir = path.join(repositoryRootPath, 'src/data')

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const outputPath = path.join(outputDir, 'git-metadata.json')

  fs.writeFileSync(outputPath, JSON.stringify(fileMetadata, null, 2), 'utf8')

  console.log(`✅ Finished! Git metadata written to: src/data/git-metadata.json`)
}

generateMetadata()
