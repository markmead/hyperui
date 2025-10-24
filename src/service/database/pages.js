import { join } from 'node:path'

import { getListings, getListing } from '@service/database/helpers'

const pagesDir = join(process.cwd(), '/src/data/pages')

export async function getPages() {
  return await getListings(pagesDir, 'SORT_BY_TITLE')
}

export async function getPage(pageSlug) {
  return await getListing(pagesDir, pageSlug)
}
