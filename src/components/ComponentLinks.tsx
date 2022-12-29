import { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from '@/styles/button.module.css'

import { SearchResult, SearchResultCategory } from '@/interface/search'

function ComponentLinks() {
  const [componentLinks, setComponentLinks] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [showLinks, setShowLinks] = useState(false)
  const [dropdownLinks, setDropdownLinks] = useState(false)

  useEffect(() => {
    setShowLinks(JSON.parse(localStorage.getItem('_SHOW_LINKS') || 'false'))

    fetch('/api/search')
      .then((result) => result.json())
      .then((data) => setComponentLinks(data))

    fetch('/api/categories')
      .then((result) => result.json())
      .then((data) => setCategoriesData(data))
  }, [])

  useEffect(() => {
    // @ts-ignore
    window.addEventListener('toggle:links', toggleComponents)

    return () => {
      // @ts-ignore
      window.removeEventListener('toggle:links', toggleComponents)
    }
  }, [])

  function toggleComponents(e: CustomEvent) {
    setShowLinks(e.detail.show)

    if (showLinks && window.innerWidth >= 768) {
      setDropdownLinks(true)
    }
  }

  return (
    <>
      {showLinks && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:relative md:inset-0 md:z-0 md:p-0">
          {dropdownLinks && (
            <div className="overflow-hidden bg-white border border-gray-100 rounded-lg shadow-lg md:rounded-none md:border-none md:shadow-none">
              {!!categoriesData.length && (
                <div className="sticky inset-x-0 top-0 bg-white border-b border-gray-100 md:relative md:border-none">
                  <ul className="flex gap-4 p-2 md:p-0">
                    {categoriesData.map(
                      (categoryData: SearchResultCategory) => (
                        <li
                          key={categoryData.slug}
                          className="inline-flex items-center gap-1.5"
                        >
                          <span
                            aria-hidden="true"
                            role="img"
                            className="text-sm"
                          >
                            {categoryData.emoji}
                          </span>

                          <span className="text-xs font-medium">
                            {categoryData.title}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {!!componentLinks.length && (
                <ul className="flex flex-wrap gap-1 p-2 mt-0 overflow-auto max-h-72 sm:max-h-64 md:mt-4 md:max-h-full md:p-0">
                  {componentLinks.map((componentLink: SearchResult) => (
                    <li key={componentLink.id}>
                      <Link
                        href={`/components/${componentLink.category.slug}/${componentLink.slug}`}
                      >
                        <a className={styles.pill}>
                          <span
                            aria-hidden="true"
                            className="text-sm"
                            role="img"
                          >
                            {componentLink.category.emoji}
                          </span>

                          <span className="text-xs font-medium">
                            {componentLink.name}
                          </span>
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="block md:hidden">
            <button
              onClick={() => setDropdownLinks(!dropdownLinks)}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-3 py-1.5 shadow-lg"
            >
              <span aria-hidden="true" role="img">
                {dropdownLinks ? '🙈' : '🙉'}
              </span>

              <span className="text-sm font-medium">
                {dropdownLinks ? 'Hide' : 'Show'} Links
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default ComponentLinks
