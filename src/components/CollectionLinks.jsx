import Link from 'next/link'

import matter from 'gray-matter'
import { join } from 'path'
import { promises as fs } from 'fs'

import ButtonStyle from '@component/ButtonStyle'

async function getComponents() {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlugs = ['application-ui', 'marketing']
  const componentSlugs = await fs.readdir(componentsPath)

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)
      const categoryItem = await fs.readFile(categoryPath, 'utf-8')

      const { data: categoryData } = matter(categoryItem)

      const componentItems = await Promise.all(
        componentSlugs
          .filter((componentSlug) => componentSlug.includes(categorySlug))
          .map(async (componentSlug) => {
            const componentPath = join(componentsPath, componentSlug)
            const componentItem = await fs.readFile(componentPath, 'utf-8')

            const { data: componentData } = matter(componentItem)

            const componentSlugFormatted = componentSlug.replace('.mdx', '')
            const componentSlugTrue = componentSlugFormatted.replace(
              `${componentData.category}-`,
              ''
            )
            const componentCount = Object.values(componentData.components).length

            return {
              title: componentData.title,
              slug: componentSlugTrue,
              count: componentCount,
              id: componentSlugFormatted,
            }
          })
      )

      componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

      return {
        categoryTitle: categoryData.title,
        categoryEmoji: categoryData.emoji,
        categorySlug: categorySlug,
        componentItems,
      }
    })
  )

  return componentsByCategory
}

export default async function CollectionLinks({ activeCollection, activeCategory }) {
  const componentsByCategory = await getComponents()

  return (
    <div>
      <details className="group">
        <summary className="inline-flex cursor-pointer">
          <ButtonStyle>
            <span aria-hidden="true" role="img" className="text-sm">
              <span className="group-open:hidden">🐵</span>
              <span className="hidden group-open:inline">🙈</span>
            </span>

            <span className="text-sm font-medium">
              <span className="group-open:hidden">Show</span>
              <span className="hidden group-open:inline">Hide</span> Collections
            </span>
          </ButtonStyle>
        </summary>

        <div className="pt-6">
          <ul className="flex gap-4">
            {componentsByCategory.map(({ categoryTitle, categoryEmoji }) => (
              <li key={categoryTitle} className="inline-flex items-center gap-1.5">
                <span aria-hidden="true" role="img" className="text-sm">
                  {categoryEmoji}
                </span>

                <span className="text-sm font-medium text-gray-900">{categoryTitle}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-4 flex gap-1 overflow-auto md:flex-wrap md:overflow-hidden">
            {componentsByCategory.map(({ categoryEmoji, categorySlug, componentItems }) => {
              return componentItems.map((componentData) => {
                const buttonText = `${componentData.title} (${componentData.count})`
                const isActive =
                  activeCategory === categorySlug && activeCollection === componentData.slug

                return (
                  <li key={componentData.id} className="shrink-0 md:shrink">
                    <Link href={`/components/${categorySlug}/${componentData.slug}`}>
                      <ButtonStyle
                        buttonEmoji={categoryEmoji}
                        buttonText={buttonText}
                        buttonActive={isActive}
                      />
                    </Link>
                  </li>
                )
              })
            })}
          </ul>
        </div>
      </details>
    </div>
  )
}
