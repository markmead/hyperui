import { useEffect, useState } from 'react'

import Link from 'next/link'

import { SearchResult, SearchResultCategory } from '@/interface/search'

import { useAppSelector } from '@/services/hooks/useStore'
import { settingsState } from '@/services/store/slices/settings'

import styles from '@/styles/button.module.css'

function ComponentLinks() {
  const { links } = useAppSelector(settingsState)

  const [componentLinks, setComponentLinks] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [showLinks, setShowLinks] = useState<boolean>(false)

  useEffect(() => {
    fetch('/api/search')
      .then((result) => result.json())
      .then((data) => setComponentLinks(data))

    fetch('/api/categories')
      .then((result) => result.json())
      .then((data) => setCategoriesData(data))
  }, [])

  useEffect(() => setShowLinks(links), [links])

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
            <ul className="mt-4 flex flex-wrap gap-1">
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
