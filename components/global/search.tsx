import { FunctionComponent, useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

type SearchResult = {
  name: string
  slug: string
  category: string
  id: string
}

const Search: FunctionComponent = () => {
  let router = useRouter()
  let dropdownRef = useRef<HTMLDivElement>()
  let [showDropdown, setShowDropdown] = useState<boolean>(false)
  let [initialResults, setInitialResults] = useState<Array<SearchResult>>([])
  let [searchQuery, setSearchQuery] = useState<string>('')
  let [searchResults, setSearchResults] = useState<Array<SearchResult>>([])

  useEffect(() => {
    fetch('/search.json')
      .then((result) => result.json())
      .then((data) => {
        let sortedData = data.items.sort(
          (resultA: SearchResult, resultB: SearchResult) =>
            resultA.name.localeCompare(resultB.name)
        )

        setInitialResults(sortedData)
        setSearchResults(sortedData)
      })
  }, [])

  useEffect(() => {
    let filteredResults = initialResults.filter(
      (initialResult: SearchResult) => {
        let { name: resultName } = initialResult

        return resultName.toLowerCase().includes(searchQuery.toLowerCase())
      }
    )

    setSearchResults(filteredResults)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  useEffect(() => {
    setSearchQuery('')
    setShowDropdown(false)
  }, [router.asPath])

  function handleClickOutsideSearch(e: Event) {
    let dropdownEl = dropdownRef.current as HTMLDivElement | undefined
    let clickEl = e.target as HTMLElement

    if (dropdownEl && !dropdownEl.contains(clickEl)) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideSearch)

    return () => {
      document.removeEventListener('click', handleClickOutsideSearch)
    }
  })

  return (
    <>
      <div ref={dropdownRef} className="relative">
        <form role="search">
          <input
            type="text"
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            onFocus={() => setShowDropdown(true)}
            value={searchQuery}
            placeholder="Search..."
            className="text-sm border-gray-200 rounded-md"
          />

          <button tabIndex={-1} className="sr-only">
            Submit
          </button>
        </form>

        {showDropdown && (
          <div className="absolute right-0 w-64 mt-2 bg-white border-2 border-gray-100 rounded-lg top-full">
            {searchResults.length > 0 ? (
              <ul className="p-2 space-y-1 overflow-auto max-h-64">
                {searchResults.map((result: any) => (
                  <li key={result.id}>
                    <Link
                      href={`/components/${result.category}/${result.slug}`}
                    >
                      <a className="block px-4 py-2 text-xs font-medium text-gray-700 rounded-md hover:bg-gray-100 focus:bg-gray-50">
                        {result.name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-sm text-center text-gray-500">
                Uh-no! There are no results 😢
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
