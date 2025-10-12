'use client'

import CollectionCard from '@component/CollectionCard'
import { useEffect, useRef, useState } from 'react'

export default function CollectionGrid({ componentItems }) {
  const [visibleCards, setVisibleCards] = useState(new Set())
  const gridRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // If we're server-side or IntersectionObserver isn't supported, show all cards
      setVisibleCards(new Set(componentItems.map((_, index) => index)))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index)
            setVisibleCards((prev) => new Set(prev).add(index))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    )

    const cards = gridRef.current?.querySelectorAll('li')
    if (cards) {
      cards.forEach((card) => observer.observe(card))
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [componentItems])

  return (
    <ul
      ref={gridRef}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {componentItems.map((componentData, componentIndex) => (
        <li
          key={componentIndex}
          data-index={componentIndex}
          className={`transition-all duration-700 ease-out ${
            visibleCards.has(componentIndex)
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
          style={{
            transitionDelay: visibleCards.has(componentIndex) ? `${componentIndex * 50}ms` : '0ms',
          }}
        >
          <CollectionCard componentData={componentData} />
        </li>
      ))}
    </ul>
  )
}
