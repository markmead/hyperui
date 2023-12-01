import { useEffect, useRef, useState } from 'react'

import { usePathname } from 'next/navigation'

import Link from 'next/link'

import { useClickAway, useDebounce } from 'react-use'

export default function HeaderSearch() {
  const routerPathname = usePathname()

  const refDropdown = useRef(null)

  const [showDropdown, setShowDropdown] = useState(false)
  const [initialResults, setInitialResults] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchQueryDebounced, setSearchQueryDebounced] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    async function getSearchResults() {
      const searchResults = await fetchSearchResults()
      const sortedSearchResults = searchResults.sort((resultA, resultB) =>
        resultA.title.localeCompare(resultB.title)
      )

      setSearchResults(sortedSearchResults)
      setInitialResults(sortedSearchResults)
    }

    getSearchResults()

    return () => {}
  }, [])

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
    <div ref={refDropdown} className="relative flex h-16 items-center">
      <form role="search" className="min-w-[120px] sm:min-w-[240px]">
        <label htmlFor="SiteSearch" className="sr-only">
          Search
        </label>

        <input
          type="text"
          onInput={(e) => setSearchQuery(e.currentTarget.value)}
          onFocus={() => setShowDropdown(true)}
          value={searchQuery}
          placeholder="Search..."
          id="SiteSearch"
          className="w-full rounded-md border-gray-200 text-sm"
        />

        <button tabIndex={-1} className="sr-only">
          Submit
        </button>
      </form>

      {showDropdown && (
        <div className="absolute right-0 top-14 z-50 w-64 rounded-lg border border-gray-100 bg-white shadow-lg">
          {searchResults.length ? (
            <ul className="max-h-64 space-y-1 overflow-auto p-2">
              {searchResults.map((searchResult) => (
                <li key={searchResult.id}>
                  <Link href={`/components/${searchResult.category.slug}/${searchResult.slug}`}>
                    <div className="flex items-center justify-between rounded-md px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 focus:bg-gray-50">
                      <span>{searchResult.title}</span>

                      <span className="block rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white">
                        {searchResult.category.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              Uh-no! There are no results 😢
            </div>
          )}
        </div>
      )}
    </div>
  )
}
