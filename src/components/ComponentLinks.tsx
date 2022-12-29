import { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from '@/styles/button.module.css'

import { SearchResult, SearchResultCategory } from '@/interface/search'

function ComponentLinks() {
  const [componentLinks, setComponentLinks] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [showLinks, setShowLinks] = useState(true)
  const [dropdownLinks, setDropdownLinks] = useState(true)

  useEffect(() => {
    setShowLinks(JSON.parse(localStorage.getItem('_SHOW_LINKS') || 'true'))

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

  function toggleComponents(event: CustomEvent) {
    setShowLinks(event.detail.show)
  }

  return (
    <>
      {showLinks && (
        <div className="relative">
          <div className="space-y-4">
            <button
              className={styles.pill}
              onClick={() => setDropdownLinks(!dropdownLinks)}
            >
              <span aria-hidden="true" className="text-sm" role="img">
                {dropdownLinks ? '🙈' : '🙉'}
              </span>

              <span className="text-xs font-medium">
                {dropdownLinks ? 'Hide' : 'Show'} Links
              </span>
            </button>

            {dropdownLinks && (
              <div className="absolute z-40 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-lg top-full md:relative md:rounded-none md:border-none md:shadow-none">
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
                              className="text-xs sm:text-sm"
                              role="img"
                            >
                              {categoryData.emoji}
                            </span>

                            <span className="text-[10px] font-medium sm:text-xs">
                              = {categoryData.title}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}

                {!!componentLinks.length && (
                  <ul className="flex flex-wrap gap-1 p-2 mt-0 overflow-auto max-h-48 sm:max-h-64 md:mt-4 md:max-h-full md:p-0">
                    {componentLinks.map((componentLink: SearchResult) => (
                      <li key={componentLink.id}>
                        <Link
                          href={`/components/${componentLink.category.slug}/${componentLink.slug}`}
                        >
                          <a className={styles.pill}>
                            <span
                              aria-hidden="true"
                              className="text-xs sm:text-sm"
                              role="img"
                            >
                              {componentLink.category.emoji}
                            </span>

                            <span className="text-[10px] font-medium sm:text-xs">
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
          </div>
        </div>
      )}
    </>
  )
}

export default ComponentLinks
