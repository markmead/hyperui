import { join } from 'node:path'

import { getPages, getPage } from '@service/database/helpers'

export const pagesDir = join(process.cwd(), '/src/data/pages')

export async function getAboutPages() {
  return await getPages(pagesDir, 'SORT_BY_TITLE')
}

export async function getAboutPage(pageSlug) {
  return await getPage(pagesDir, pageSlug)
}
