import { join } from 'node:path'

import { getPages, getPage } from '@service/database/helpers'

export const postsDir = join(process.cwd(), '/src/data/posts')

export async function getPosts() {
  return await getPages(postsDir, 'SORT_BY_DATE')
}

export async function getPost(pageSlug) {
  return await getPage(postsDir, pageSlug)
}
