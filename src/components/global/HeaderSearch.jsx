import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useClickAway, useDebounce } from 'react-use'

export default function Search() {
  const routerPathname = usePathname()

  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  const [allCollections, setAllCollections] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useDebounce(() => setDebouncedSearchQuery(searchQuery), 300, [searchQuery])

  useEffect(() => {
    async function fetchCollections() {
      const searchResponse = await fetch('/api/search')

      const { collections } = await searchResponse.json()

      setAllCollections(collections || [])
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setSearchResults([])
      setShowDropdown(false)

      return
    }

    const queryLower = debouncedSearchQuery.toLowerCase()

    const filteredCollections = allCollections.filter(({ title, terms }) => {
      const titleMatch = title.toLowerCase().includes(queryLower)
      const termsMatch = terms.some((termItem) => termItem.includes(queryLower))

      return titleMatch || termsMatch
    })

    setSearchResults(filteredCollections)
    setShowDropdown(filteredCollections.length > 0)
  }, [debouncedSearchQuery, allCollections])

  useEffect(() => {
    setSearchQuery('')
  }, [routerPathname])

  useClickAway(wrapperRef, () => setShowDropdown(false))

  return (
    <div className="relative w-full max-w-64" ref={wrapperRef}>
      <label htmlFor="SearchQuery">
        <span className="sr-only">Search</span>

        <input
          type="text"
          className="w-full rounded border-stone-300 focus:border-indigo-400 focus:ring-indigo-400"
          placeholder="Search components..."
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
          id="SearchQuery"
          ref={inputRef}
        />
      </label>

      {showDropdown && (
        <ul className="absolute inset-x-0 z-50 mt-1 max-h-64 divide-y divide-stone-200 overflow-auto rounded border border-stone-300 bg-white shadow-lg">
          {searchResults.map((collectionItem, itemIndex) => (
            <li key={itemIndex}>
              <SearchResult collectionItem={collectionItem} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function SearchResult({ collectionItem }) {
  return (
    <Link
      href={`/components/${collectionItem.category}/${collectionItem.slug}`}
      className="block px-4 py-2 transition-colors hover:bg-stone-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:ring-inset md:flex md:items-center md:justify-between"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true">{collectionItem.emoji}</span>

        <span className="font-medium text-stone-900">{collectionItem.title}</span>
      </div>

      <span className="mt-0.5 block text-sm text-stone-700 md:mt-0">
        {collectionItem.categoryTitle}
      </span>
    </Link>
  )
}
