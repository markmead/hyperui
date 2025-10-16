'use client'

import { useMemo } from 'react'
import { useInView } from 'react-intersection-observer'

import CollectionGrid from '@component/CollectionGrid'

export default function RelatedComponents({
  collectionId,
  collectionTerms = [],
  componentItems = [],
}) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  const relatedCollections = useMemo(() => {
    if (!inView) {
      return []
    }

    const flatComponents = componentItems.flatMap(({ componentItems }) => componentItems)

    return flatComponents
      .filter(({ id }) => id !== collectionId)
      .filter(({ terms }) =>
        collectionTerms.some((collectionTerm) => terms.includes(collectionTerm))
      )
  }, [inView, componentItems, collectionId, collectionTerms])

  if (!relatedCollections.length) {
    return <div ref={ref} />
  }

  return (
    <div ref={ref} className="mt-8 space-y-4 border-t border-stone-300 pt-8 lg:mt-12 lg:pt-12">
      <h2 className="text-xl font-bold text-stone-900">Related Components</h2>

      <CollectionGrid componentItems={relatedCollections} />
    </div>
  )
}
