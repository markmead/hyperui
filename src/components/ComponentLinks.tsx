import { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from '@/styles/button.module.css'

import { SearchResult, SearchResultCategory } from '@/interface/search'

function ComponentLinks() {
  const [showLinks, setShowLinks] = useState(false)
  const [componentLinks, setComponentLinks] = useState([])
  const [categoriesData, setCategoriesData] = useState([])

  useEffect(() => {
    toggleComponentsLinks()

    fetch('/api/search')
      .then((result) => result.json())
      .then((data) => setComponentLinks(data))

    fetch('/api/categories')
      .then((result) => result.json())
      .then((data) => setCategoriesData(data))
  }, [])

  useEffect(() => {
    window.addEventListener('setting:component-links', toggleComponentsLinks)

    return () => {
      window.removeEventListener(
        'setting:component-links',
        toggleComponentsLinks
      )
    }
  })

  function toggleComponentsLinks() {
    setShowLinks(
      JSON.parse(localStorage.getItem('_SETTING_COMPONENT_LINKS') || 'false')
    )
  }

  return (
    <>
      {showLinks && (
        <div className="hidden md:block">
          {!!categoriesData.length && (
            <ul className="flex gap-4">
              {categoriesData.map((categoryData: SearchResultCategory) => (
                <li
                  key={categoryData.slug}
                  className="inline-flex items-center gap-1.5"
                >
                  <span aria-hidden="true" role="img" className="text-sm">
                    {categoryData.emoji}
                  </span>

                  <span className="text-xs font-medium">
                    {categoryData.title}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {!!componentLinks.length && (
            <ul className="flex flex-wrap gap-1 mt-4">
              {componentLinks.map((componentLink: SearchResult) => (
                <li key={componentLink.id}>
                  <Link
                    href={`/components/${componentLink.category.slug}/${componentLink.slug}`}
                  >
                    <a className={styles.pill}>
                      <span aria-hidden="true" role="img" className="text-sm">
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
    </>
  )
}

export default ComponentLinks
