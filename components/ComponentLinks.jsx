'use client'

import Link from 'next/link'

import { useState, useEffect } from 'react'

import ButtonStyle from '@component/ButtonStyle'

export default function ComponentLinks() {
  const [categoriesData, setCategoriesData] = useState([])
  const [componentLinks, setComponentLinks] = useState([])

  useEffect(() => {
    async function getCategoriesData() {
      setCategoriesData(await fetchCategoryResults())
    }

    async function getComponentLinks() {
      setComponentLinks(await fetchComponentResults())
    }

    getCategoriesData()
    getComponentLinks()

    return () => {}
  }, [])

  async function fetchCategoryResults() {
    const categoriesResult = await fetch('/api/categories')

    return categoriesResult.json()
  }

  async function fetchComponentResults() {
    const componentsResult = await fetch('/api/search')

    return componentsResult.json()
  }

  return (
    <div className="hidden md:block">
      <ul className="flex gap-4">
        {categoriesData.map((categoryData) => (
          <li
            key={categoryData.title}
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

      <ul className="mt-4 flex flex-wrap gap-1">
        {componentLinks.map((componentLink) => {
          const buttonText = `${componentLink.title} (${componentLink.count})`

          return (
            <li key={componentLink.id}>
              <Link
                href={`/components/${componentLink.category.slug}/${componentLink.slug}`}
              >
                <ButtonStyle
                  emoji={componentLink.category.emoji}
                  text={buttonText}
                />
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
