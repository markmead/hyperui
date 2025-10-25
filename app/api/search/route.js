import { NextResponse } from 'next/server'

import { getComponents, getPosts } from '@service/database'

export async function GET() {
  try {
    const [componentsByCategory, blogPosts] = await Promise.all([getComponents(), getPosts()])

    const flatCollections = componentsByCategory.flatMap(({ componentItems, categoryTitle }) =>
      componentItems.map((componentItem) => ({
        ...componentItem,
        categoryTitle,
      }))
    )

    return NextResponse.json({ collections: flatCollections, blogs: blogPosts })
  } catch {
    return NextResponse.json({ error: 'Failed to load collections or blogs' }, { status: 500 })
  }
}
