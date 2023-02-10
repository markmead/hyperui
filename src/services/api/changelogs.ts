import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

type DynamicData = {
  [key: string]: string | number
}

const changelogsDirectory = join(process.cwd(), '/src/data/changelog')

export function getChangelogSlugs() {
  return fs.readdirSync(changelogsDirectory)
}

export function getChangelogPaths() {
  const changelogSlugs = getChangelogSlugs().map((changelogSlug: string) =>
    changelogSlug.replace(/\.mdx$/, '')
  )

  return changelogSlugs.map((changelogSlug: string) => {
    return {
      params: {
        slug: changelogSlug,
      },
    }
  })
}

export function getChangelogBySlug(
  changelogSlug: string,
  dataFields: string[] = []
) {
  const trueSlug = changelogSlug.replace(/\.mdx$/, '')
  const fullPath = join(changelogsDirectory, `${trueSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: fileData, content: fileContent } = matter(fileContents)

  const changelogData: DynamicData = {}

  dataFields.forEach(function (dataField: string) {
    if (dataField === 'slug') {
      changelogData[dataField] = trueSlug
    }

    if (dataField === 'content') {
      changelogData[dataField] = fileContent
    }

    if (typeof fileData[dataField] !== 'undefined') {
      changelogData[dataField] = fileData[dataField]
    }
  })

  return changelogData
}

export function getChangelogs(dataFields: string[] = []) {
  const changelogSlugs = getChangelogSlugs()

  const changelogPosts = changelogSlugs
    .map((changelogSlug: string) =>
      getChangelogBySlug(changelogSlug, dataFields)
    )
    .sort((changelogA, changelogB) =>
      new Date(changelogA.date) < new Date(changelogB.date) ? 1 : -1
    )

  return changelogPosts
}
