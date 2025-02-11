import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useClickAway, useDebounce } from 'react-use'

import Link from 'next/link'

import { iSearchItem } from '@type/search'

export default function HeaderSearch() {
  const routerPathname = usePathname()

  const refDropdown = useRef(null)

  const [showDropdown, setShowDropdown] = useState(false)
  const [initialResults, setInitialResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryDebounced, setSearchQueryDebounced] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (!showDropdown || initialResults.length) {
      return
    }

    async function getSearchResults() {
      const searchResults: iSearchItem[] = await fetchSearchResults()

      const sortedSearchResults = searchResults.sort((resultA, resultB) =>
        resultA.title.localeCompare(resultB.title)
      )

      setSearchResults(sortedSearchResults)
      setInitialResults(sortedSearchResults)
    }

    getSearchResults()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDropdown])

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(initialResults)

      return
    }

    const filteredResults = initialResults.filter(function (initialResult) {
      const { title: initialTitle } = initialResult

      return initialTitle.toLowerCase().includes(searchQuery.toLowerCase().trim())
    })

    setSearchResults(filteredResults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQueryDebounced])

  useEffect(() => {
    setSearchQuery('')
    setShowDropdown(false)
  }, [routerPathname])

  useClickAway(refDropdown, () => setShowDropdown(false))

  useDebounce(() => setSearchQueryDebounced(searchQuery), 500, [searchQuery])

  async function fetchSearchResults() {
    const searchResults = await fetch('/api/search')
    const searchJson = await searchResults.json()

    return searchJson
  }

  return (
    <div ref={refDropdown} className="relative flex h-16 max-w-[300px] flex-1 items-center">
      <form role="search" className="flex-1">
        <label htmlFor="SiteSearch" className="sr-only">
          Search
        </label>

        <input
          type="text"
          value={searchQuery}
          placeholder="Search..."
          id="SiteSearch"
          className="w-full rounded-md border-gray-200 sm:text-sm"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          onFocus={() => setShowDropdown(true)}
        />

        <button tabIndex={-1} className="sr-only">
          Submit
        </button>
      </form>

      {showDropdown && (
        <div className="fixed inset-x-0 top-14 z-50 rounded-md border border-gray-100 bg-white shadow-lg sm:absolute">
          {searchResults.length ? (
            <ul className="max-h-64 space-y-1 overflow-auto p-2">
              {searchResults.map((searchResult) => (
                <li key={searchResult.id}>
                  <Link
                    href={`/components/${searchResult.category.slug}/${searchResult.slug}`}
                    className="flex items-center justify-between rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:bg-gray-50"
                  >
                    <span>{searchResult.title}</span>

                    <span className="block rounded-xs bg-gray-900 px-1.5 py-0.5 text-xs text-white">
                      {searchResult.category.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-700">
              {searchQuery ? 'Uh-no! There are no results 😢' : 'Loading search results...'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
