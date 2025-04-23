import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useClickAway } from 'react-use'

export default function Search() {
  const routerPathname = usePathname()

  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allCollections, setAllCollections] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    async function fetchCollections() {
      const searchResponse = await fetch('/api/search')

      const { collections } = await searchResponse.json()

      setAllCollections(collections || [])
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      setShowDropdown(false)

      return
    }

    const queryLower = searchQuery.toLowerCase()

    const filteredCollections = allCollections.filter(({ title, terms }) => {
      const titleMatch = title.toLowerCase().includes(queryLower)
      const termsMatch = terms.some((termItem) => termItem.toLowerCase().includes(queryLower))

      return titleMatch || termsMatch
    })

    setSearchResults(filteredCollections)
    setShowDropdown(!!filteredCollections.length)
  }, [searchQuery, allCollections])

  useEffect(() => {
    setSearchQuery('')
  }, [routerPathname])

  useClickAway(wrapperRef, () => setShowDropdown(false))

  return (
    <div className="relative w-full max-w-72" ref={wrapperRef}>
      <label htmlFor="SearchQuery">
        <span className="sr-only">Search</span>

        <input
          type="text"
          className="w-full rounded border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
          placeholder="Search components..."
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          onFocus={() => !!searchResults.length && setShowDropdown(true)}
          id="SearchQuery"
          ref={inputRef}
        />
      </label>

      {showDropdown && (
        <ul className="absolute inset-x-0 z-50 mt-1 max-h-64 divide-y divide-gray-200 overflow-auto rounded border border-gray-300 bg-white shadow-lg">
          {searchResults.map((collectionItem, itemIndex) => (
            <li key={itemIndex}>
              <Link
                href={`/components/${collectionItem.category}/${collectionItem.slug}`}
                className="flex items-center gap-2 px-4 py-2 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-pink-400 focus:outline-none focus:ring-inset"
                onClick={() => setShowDropdown(false)}
              >
                <span aria-hidden="true" role="img">
                  {collectionItem.emoji}
                </span>

                <span className="text-sm font-medium text-gray-900">{collectionItem.title}</span>

                <span className="ml-auto text-sm text-gray-700">
                  {collectionItem.categoryTitle}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
