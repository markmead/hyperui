import { useEffect, useState } from 'react'

import Link from 'next/link'

import styles from '@/styles/button.module.css'

import { SearchResult, SearchResultCategory } from '@/interface/search'

function ComponentLinks() {
  const [componentLinks, setComponentLinks] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [showLinks, setShowLinks] = useState(true)

  useEffect(() => {
    setShowLinks(JSON.parse(localStorage.getItem('_SHOW_LINKS') || 'true'))

    fetch('/api/search')
      .then((result) => result.json())
      .then((data) => {
        const categoriesData = data
          .map((searchResult: SearchResult) => searchResult.category)
          .filter(
            (
              resultA: SearchResultCategory,
              arrayIndex: number,
              componentArray: Array<SearchResultCategory>
            ) =>
              componentArray.findIndex(
                (resultB: SearchResultCategory) => resultB.slug === resultA.slug
              ) === arrayIndex
          )

        setCategoriesData(categoriesData)
        setComponentLinks(data)
      })
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
      {!!showLinks && (
        <div className="space-y-4">
          {categoriesData.length && (
            <ul className="flex gap-4">
              {categoriesData.map((categoryData: SearchResultCategory) => (
                <li
                  key={categoryData.slug}
                  className="inline-flex items-center gap-1.5"
                >
                  <span aria-hidden="true" className="text-sm" role="img">
                    {categoryData.emoji}
                  </span>

                  <span className="text-xs font-medium">
                    = {categoryData.title}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {componentLinks.length && (
            <ul className="flex flex-wrap gap-1">
              {componentLinks.map((componentLink: SearchResult) => (
                <li key={componentLink.id}>
                  <Link
                    href={`/components/${componentLink.category.slug}/${componentLink.slug}`}
                  >
                    <a className={styles.pill}>
                      <span aria-hidden="true" className="text-sm" role="img">
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
