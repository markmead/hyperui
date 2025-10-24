import { NextResponse } from 'next/server'

import { getComponents } from '@service/database'
import { getPosts } from '@service/database/posts'

export async function GET() {
  try {
    const [componentsByCategory, blogPosts] = await Promise.all([getComponents(), getPosts()])

    const flatCollections = componentsByCategory.flatMap(({ category, components }) => {
      return components.map((componentItem) => ({
        ...componentItem,
        category: category.slug,
      }))
    })

    return NextResponse.json({ collections: flatCollections, blogs: blogPosts })
  } catch {
    return NextResponse.json({ error: 'Failed to load collections or blogs' }, { status: 500 })
  }
}
