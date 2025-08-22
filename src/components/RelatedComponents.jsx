'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import CollectionGrid from './CollectionGrid'

export default function RelatedComponents({
  collectionId,
  collectionTerms = [],
  componentItems = [],
}) {
  const [relatedCollections, setRelatedCollections] = useState([])

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!inView) {
      return
    }

    const flatComponents = componentItems.flatMap(({ componentItems }) => componentItems)

    const filteredComponents = flatComponents
      .filter((componentItem) => componentItem.id !== collectionId)
      .filter((componentItem) => {
        return collectionTerms.some((collectionTerm) =>
          componentItem.terms.includes(collectionTerm)
        )
      })

    setRelatedCollections(filteredComponents)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return (
    <div ref={ref}>
      {relatedCollections.length > 0 ? (
        <div className="mt-8 space-y-4 border-t border-stone-300 pt-8 lg:mt-12 lg:pt-12">
          <h2 className="text-xl font-bold text-stone-900">Related Components</h2>

          <CollectionGrid componentItems={relatedCollections} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
