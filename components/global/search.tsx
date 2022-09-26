import { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

const Search: FunctionComponent = () => {
  let router = useRouter()
  let [initialResults, setInitialResults] = useState<any>([])
  let [searchQuery, setSearchQuery] = useState<string>('')
  let [searchResults, setSearchResults] = useState<any>([])

  useEffect(() => {
    fetch('/search.json')
      .then((result) => result.json())
      .then((data) => {
        let sortedData = data.items.sort((resultA: any, resultB: any) =>
          resultA.name.localeCompare(resultB.name)
        )

        setInitialResults(sortedData)
      })
  }, [])

  useEffect(() => {
    let filteredResults = initialResults.filter((initialResult: any) => {
      let { name: resultName } = initialResult

      return resultName.toLowerCase().includes(searchQuery.toLowerCase())
    })

    setSearchResults(filteredResults)
  }, [searchQuery])

  useEffect(() => {
    setSearchQuery('')
  }, [router.asPath])

  return (
    <>
      <div className="relative">
        <form role="search">
          <input
            type="text"
            onInput={(e) => setSearchQuery(e.currentTarget.value)}
            value={searchQuery}
            placeholder="Search..."
            className="text-sm border-gray-200 rounded-md"
          />

          <button tabIndex={-1} className="sr-only">
            Submit
          </button>
        </form>

        {searchQuery && (
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
