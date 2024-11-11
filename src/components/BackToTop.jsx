'use client'

import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 100)

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    hasScrolled && (
      <a
        href="#"
        className="fixed bottom-4 right-4 z-[999] grid size-12 place-content-center rounded-full bg-gray-900 shadow-lg"
      >
        <span className="sr-only">Back to top</span>

        <span role="img">👆</span>
      </a>
    )
  )
}
