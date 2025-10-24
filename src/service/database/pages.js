import { pagesDir } from '@service/database'
import { getListings, getListing } from '@service/database/helpers'

export async function getPages() {
  return await getListings(pagesDir, 'SORT_BY_TITLE')
}

export async function getPage(pageSlug) {
  return await getListing(pagesDir, pageSlug)
}
