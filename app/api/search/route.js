import { NextResponse } from 'next/server'

import { getComponents } from '@service/database'

export async function GET() {
  try {
    const componentsByCategory = await getComponents()

    const flatCollections = componentsByCategory.flatMap(({ componentItems, categoryTitle }) =>
      componentItems.map((componentItem) => ({
        ...componentItem,
        categoryTitle,
      }))
    )

    return NextResponse.json({ collections: flatCollections })
  } catch {
    return NextResponse.json({ error: 'Failed to load collections' }, { status: 500 })
  }
}
