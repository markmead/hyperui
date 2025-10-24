import { join } from 'node:path'

import { getListings, getListing } from '@service/database/helpers'

const postsDir = join(process.cwd(), '/src/data/posts')

export async function getPosts() {
  return await getListings(postsDir, 'SORT_BY_DATE')
}

export async function getPost(pageSlug) {
  return await getListing(postsDir, pageSlug)
}
