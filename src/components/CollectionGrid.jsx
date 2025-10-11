'use client'

import CollectionCard from '@component/CollectionCard'
import { useState, useEffect } from 'react'

export default function CollectionGrid({ componentItems }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {componentItems.map((componentData, componentIndex) => (
        <li
          key={componentIndex}
          className={`transition-all duration-500 ease-out ${
            isVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
          }`}
          style={{
            transitionDelay: isVisible ? `${componentIndex * 50}ms` : '0ms',
          }}
        >
          <CollectionCard componentData={componentData} />
        </li>
      ))}
    </ul>
  )
}
