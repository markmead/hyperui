import Link from 'next/link'

import ButtonStyle from '@component/ButtonStyle'

async function getComponents() {
  return await fetch('/api/search')
}

async function getCategories() {
  return await fetch('/api/categories')
}

export default async function ComponentLinks() {
  const categoriesData = await getCategories()
  const componentLinks = await getComponents()

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

            <span className="text-xs font-medium text-gray-900">
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
