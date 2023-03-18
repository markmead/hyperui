import { useEffect, useState } from 'react'

import Link from 'next/link'

import { SearchResult, SearchResultCategory } from '@/interface/search'

import { useAppSelector } from '@/services/hooks/useStore'
import { settingsState } from '@/services/store/slices/settings'

import ButtonStyle from '@/components/ButtonStyle'

function ComponentLinks() {
  const { links } = useAppSelector(settingsState)

  const [componentLinks, setComponentLinks] = useState([])
  const [categoriesData, setCategoriesData] = useState([])
  const [showLinks, setShowLinks] = useState<boolean>(false)

  useEffect(() => {
    const getComponentLinks = async () =>
      setComponentLinks(await fetchComponentResults())

    const getCategoriesData = async () =>
      setCategoriesData(await fetchCategoryResults())

    getComponentLinks()
    getCategoriesData()

    return () => {}
  }, [])

  useEffect(() => setShowLinks(links), [links])

  async function fetchComponentResults() {
    const componentsResult = await fetch('/api/search')
    const resultsData = await componentsResult.json()

    return resultsData
  }

  async function fetchCategoryResults() {
    const categoriesResult = await fetch('/api/categories')
    const resultsData = await categoriesResult.json()

    return resultsData
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

                  <span className="text-xs font-medium text-gray-900 dark:text-white">
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
                    <ButtonStyle
                      emoji={componentLink.category.emoji}
                      text={componentLink.name}
                    />
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
