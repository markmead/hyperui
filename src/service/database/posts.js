import { postsDir } from '@service/database'
import { getListings, getListing } from '@service/database/helpers'

export async function getPosts() {
  return await getListings(postsDir, 'SORT_BY_DATE')
}

export async function getPost(pageSlug) {
  return await getListing(postsDir, pageSlug)
}
