import { useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { SearchItem } from '@type/search'

export default function HeaderSearch() {
  const routerPathname: string = usePathname()

  const refDropdown = useRef<HTMLDivElement | null>(null)

  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [initialResults, setInitialResults] = useState<SearchItem[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchQueryDebounced, setSearchQueryDebounced] = useState<string>('')
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])

  const showError: boolean = Boolean(searchQuery) && Boolean(!searchResults.length)

  useEffect(() => {
    if (!showDropdown || initialResults.length) {
      return
    }

    async function getSearchResults() {
      const searchResults: SearchItem[] = await fetchSearchResults()

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

    const filteredResults: SearchItem[] = initialResults.filter((initialResult) => {
      const resultTitle: string = initialResult.title

      return resultTitle.toLowerCase().includes(searchQuery.toLowerCase().trim())
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

  async function fetchSearchResults(): Promise<SearchItem[]> {
    const searchResults = await fetch('/api/search')
    const searchJson = await searchResults.json()

    return searchJson
  }

  return (
    <div ref={refDropdown} className="relative flex h-16 max-w-[300px] flex-1 items-center">
      <form role="search" className="flex-1">
        <label htmlFor="SiteSearch">
          <span className="sr-only">Search</span>

          <input
            type="text"
            value={searchQuery}
            placeholder="Search..."
            autoComplete="off"
            id="SiteSearch"
            className="w-full rounded-md border-gray-200 sm:text-sm"
            aria-label="Search"
            onInput={(inputEvent) => setSearchQuery(inputEvent.currentTarget.value)}
            onFocus={() => setShowDropdown(true)}
          />
        </label>

        <button tabIndex={-1} className="sr-only" type="submit">
          Submit
        </button>
      </form>

      {showDropdown && (
        <div className="fixed inset-x-0 top-14 z-50 rounded-md border border-gray-100 bg-white shadow-lg sm:absolute">
          {Boolean(searchResults.length) && (
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
          )}

          {showError && (
            <div className="p-4 text-center text-sm text-gray-700">
              Uh-no! There are no results{' '}
              <span role="img" aria-hidden="true">
                😢
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
