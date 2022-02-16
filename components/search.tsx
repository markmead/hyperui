import { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'

import { Collection } from '../interface/collection'
import { collections } from '../lib/collections'
import { useRouter } from 'next/router'

const Search: FunctionComponent = () => {
  let router = useRouter()

  let [open, setOpen] = useState(false)
  let [query, setQuery] = useState('')
  let [results, setResults] = useState<Array<Collection>>([])

  useEffect(() => {
    let searchInput: HTMLInputElement | null = document.querySelector('#search')

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'k') {
        setOpen(!open)

        open ? searchInput?.blur() : searchInput?.focus()
      }

      if (e.key === 'Enter' && results.length === 1) {
        router.push(`/components/${results[0].id}`)
      }
    })

    searchInput?.addEventListener('blur', () => setOpen(false))
    searchInput?.addEventListener('focus', () => setOpen(true))

    setResults(
      collections.filter((collection) =>
        collection.title.toLowerCase().includes(query.toLowerCase())
      )
    )
  }, [open, query])

  useEffect(() => {
    let activeElement = document.activeElement as HTMLElement

    activeElement.blur()

    setQuery('')
  }, [router.asPath])

  return (
    <div className="mr-8 group">
      <div className="relative">
        <label className="sr-only" htmlFor="search">
          Search
        </label>

        <input
          className="w-64 pr-16 text-xs border-2 border-gray-100 rounded-lg"
          id="search"
          type="text"
          placeholder="Search Components..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />

        <div className="absolute px-2 py-1 text-xs font-medium -translate-y-1/2 bg-gray-100 rounded-md top-1/2 right-2">
          ⌘ K
        </div>
      </div>

      <div className="hidden group-focus-within:block">
        <div className="absolute top-auto w-64 p-2 mt-6 bg-white border-2 border-gray-100 rounded-xl">
          {results.length > 0 ? (
            <ul className="overflow-y-auto max-h-64">
              {results.map((collection, index) => (
                <li key={index}>
                  <Link href={`/components/${collection.id}`}>
                    <a className="block p-2 text-xs font-medium rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-50">
                      {collection.title}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-4 text-xs font-medium text-center text-gray-500">
              No results
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search
