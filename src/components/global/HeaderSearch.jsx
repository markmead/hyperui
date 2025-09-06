import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { useClickAway, useDebounce } from 'react-use'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Search() {
  const routerPathname = usePathname()

  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const [allCollections, setAllCollections] = useState([])
  const [allBlogs, setAllBlogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [collectionResults, setCollectionResults] = useState([])
  const [blogResults, setBlogResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMacOs, setIsMacOs] = useState(true)

  const [wrapperRef] = useAutoAnimate()
  const [groupRef] = useAutoAnimate()
  const [collectionRef] = useAutoAnimate()
  const [blogRef] = useAutoAnimate()

  useDebounce(() => setDebouncedSearchQuery(searchQuery), 300, [searchQuery])

  useEffect(() => {
    async function fetchSearch() {
      const searchResponse = await fetch('/api/search')

      const { collections, blogs } = await searchResponse.json()

      setAllCollections(collections || [])
      setAllBlogs(blogs || [])
    }

    fetchSearch()
  }, [])

  useEffect(() => {
    if (!debouncedSearchQuery) {
      setCollectionResults([])
      setBlogResults([])
      setShowDropdown(false)

      return
    }

    const queryLower = debouncedSearchQuery.toLowerCase()

    const filteredCollections = allCollections.filter(({ title, terms }) => {
      const titleMatch = title.toLowerCase().includes(queryLower)
      const termsMatch = terms.some((termItem) => termItem.includes(queryLower))

      return titleMatch || termsMatch
    })

    const filteredBlogs = allBlogs.filter(({ title }) => {
      return title.toLowerCase().includes(queryLower)
    })

    setCollectionResults(filteredCollections)
    setBlogResults(filteredBlogs)
    setShowDropdown(filteredCollections.length > 0 || filteredBlogs.length > 0)
  }, [debouncedSearchQuery, allCollections, allBlogs])

  useEffect(() => {
    setSearchQuery('')
  }, [routerPathname])

  useEffect(() => {
    function handleKeyDown(keydownEvent) {
      if ((keydownEvent.metaKey || keydownEvent.ctrlKey) && keydownEvent.code === 'KeyK') {
        keydownEvent.preventDefault()

        const inputElement = document.querySelector('#SearchQuery')

        if (!inputElement) {
          return
        }

        inputElement.focus()
      }
    }

    globalThis.addEventListener('keydown', handleKeyDown)

    return () => globalThis.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    try {
      const userAgent = navigator.userAgent || ''

      if (/mac/i.test(userAgent)) {
        setIsMacOs(true)
      }

      if (/win/i.test(userAgent)) {
        setIsMacOs(false)
      }

      if (/linux/i.test(userAgent)) {
        setIsMacOs(false)
      }
    } catch {
      // We do nothing
    }
  }, [])

  useClickAway(dropdownRef, () => setShowDropdown(false))

  return (
    <div className="relative w-screen max-w-xs" ref={dropdownRef}>
      <label htmlFor="SearchQuery">
        <span className="sr-only">Search</span>

        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-stone-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400"
            placeholder="Search components..."
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            onFocus={() => collectionResults.length > 0 && setShowDropdown(true)}
            id="SearchQuery"
            ref={inputRef}
          />

          <span className="pointer-events-none absolute inset-y-0 right-0 hidden size-[42px] place-content-center lg:grid">
            <kbd className="font-sans text-xs text-stone-700">{isMacOs ? '⌘K' : 'CtrlK'}</kbd>
          </span>
        </div>
      </label>

      <div ref={wrapperRef}>
        {showDropdown && (
          <div
            ref={groupRef}
            className="absolute inset-x-0 z-50 mt-1 max-h-64 divide-y divide-stone-200 overflow-auto rounded-lg border border-stone-300 bg-white shadow-lg"
          >
            {collectionResults.length > 0 ? (
              <div>
                <div className="px-4 py-2">
                  <p className="font-medium text-stone-900">
                    Components ({collectionResults.length})
                  </p>
                </div>

                <ul
                  ref={collectionRef}
                  className="divide-y divide-stone-200 border-t border-stone-200"
                >
                  {collectionResults.map((collectionItem, itemIndex) => (
                    <li key={itemIndex}>
                      <ComponentResult collectionItem={collectionItem} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}

            {blogResults.length > 0 ? (
              <div>
                <div className="px-4 py-2">
                  <p className="font-medium text-stone-900">Blogs ({blogResults.length})</p>
                </div>

                <ul ref={blogRef} className="divide-y divide-stone-200 border-t border-stone-200">
                  {blogResults.map((blogItem, itemIndex) => (
                    <li key={itemIndex}>
                      <BlogResult blogItem={blogItem} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function ComponentResult({ collectionItem }) {
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

function BlogResult({ blogItem }) {
  return (
    <Link
      href={`/blog/${blogItem.slug}`}
      className="block px-4 py-2 transition-colors hover:bg-stone-50 focus:ring-2 focus:ring-indigo-400 focus:outline-none focus:ring-inset"
    >
      <div className="flex items-center gap-2">
        <span aria-hidden="true">{blogItem.emoji}</span>

        <span className="line-clamp-1 font-medium text-pretty text-stone-900">
          {blogItem.title}
        </span>
      </div>
    </Link>
  )
}
