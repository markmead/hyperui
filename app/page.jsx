import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

async function getComponents() {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlugs = ['application', 'marketing']

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)
      const categoryItem = await fs.readFile(categoryPath, 'utf-8')

      const { frontmatter: categoryData } = await serialize(categoryItem, {
        parseFrontmatter: true,
      })

      const componentSlugs = await fs.readdir(join(componentsPath, categorySlug))

      const componentItems = await Promise.all(
        componentSlugs
          .filter((componentSlug) => componentSlug.includes('.mdx'))
          .map(async (componentSlug) => {
            const componentPath = join(componentsPath, categorySlug, componentSlug)
            const componentItem = await fs.readFile(componentPath, 'utf-8')

            const { frontmatter: componentData } = await serialize(componentItem, {
              parseFrontmatter: true,
            })

            const componentCount = componentData.components.reduce(
              (currentCount, componentItem) => {
                const isDark = !!componentItem.dark

                return currentCount + (isDark ? 2 : 1)
              },
              0
            )

            const componentSlugFormatted = componentSlug.replace('.mdx', '')

            return {
              title: componentData.title,
              slug: componentSlugFormatted,
              category: categorySlug,
              emoji: componentData.emoji,
              count: componentCount,
              tag: componentData.tag,
              id: componentSlugFormatted,
            }
          })
      )

      componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

      return {
        categoryTitle: categoryData?.title,
        componentItems,
      }
    })
  )

  return componentsByCategory
}

export default async function Page() {
  const componentsByCategory = await getComponents()

  return (
    <>
      <HeroBanner title="HyperUI" subtitle="Free Open Source Tailwind CSS v4 Components">
        HyperUI is a collection of free Tailwind CSS components that can be used in your next
        project. With a range of components, you can build your next marketing website, admin
        dashboard, eCommerce store and much more.
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12">
        <ul className="space-y-8">
          {componentsByCategory.map(({ categoryTitle, componentItems = [] }) => {
            return (
              <li className="space-y-4" key={categoryTitle}>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {categoryTitle} Components
                </h2>

                <CollectionGrid componentItems={componentItems} />
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
