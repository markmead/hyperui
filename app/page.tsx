import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'

import { iPageMeta } from '@type/site'
import { iCategoryItem, iCollectionItem } from '@type/component'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import CollectionGrid from '@component/CollectionGrid'

interface iCollectionData
  extends Omit<iCollectionItem, 'container' | 'wrapper' | 'seo' | 'components'> {
  id: string
  slug: string
  count: number
}

interface iPageData {
  categoryTitle: string
  componentItems: iCollectionData[]
}

export const metadata: Omit<iPageMeta, 'title' | 'description'> = {
  alternates: {
    canonical: '/',
  },
}

async function getComponents() {
  const componentsPath: string = join(process.cwd(), '/src/data/components')
  const categoriesPath: string = join(process.cwd(), '/src/data/categories')

  const categorySlugs: string[] = ['application-ui', 'marketing']
  const componentSlugs: Awaited<string[]> = await fs.readdir(componentsPath)

  const componentsByCategory: Awaited<iPageData[]> = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const categoryPath: string = join(categoriesPath, `${categorySlug}.mdx`)
      const categoryItem: Awaited<string> = await fs.readFile(categoryPath, 'utf-8')

      const { frontmatter: categoryData }: Awaited<{ frontmatter: iCategoryItem }> =
        await serialize(categoryItem, { parseFrontmatter: true })

      const componentItems: Awaited<iCollectionData[]> = await Promise.all(
        componentSlugs
          .filter((componentSlug) => componentSlug.includes(categorySlug))
          .map(async (componentSlug) => {
            const componentPath: string = join(componentsPath, componentSlug)
            const componentItem: Awaited<string> = await fs.readFile(componentPath, 'utf-8')

            const { frontmatter: componentData }: Awaited<{ frontmatter: iCollectionItem }> =
              await serialize(componentItem, { parseFrontmatter: true })

            const componentSlugFormatted: string = componentSlug.replace('.mdx', '')
            const componentSlugTrue: string = componentSlugFormatted.replace(
              `${componentData.category}-`,
              ''
            )
            const componentCount: number = Object.values(componentData.components).length

            return {
              id: componentSlugFormatted,
              title: componentData.title,
              slug: componentSlugTrue,
              category: componentData.category,
              emoji: componentData.emoji,
              count: componentCount,
              tag: componentData.tag,
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
  const componentsByCategory: Awaited<iPageData[]> = await getComponents()

  return (
    <>
      <HeroBanner title="HyperUI" subtitle="Free Open Source Tailwind CSS v4 Components">
        HyperUI is a collection of free Tailwind CSS components that can be used in your next
        project. With a range of components, you can build your next marketing website, admin
        dashboard, eCommerce store and much more.
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12">
        <ul className="space-y-8">
          {componentsByCategory.map(({ categoryTitle, componentItems }) => {
            return (
              <li key={categoryTitle} className="space-y-4">
                <h2 className="text-lg font-bold text-gray-900 sm:text-xl">{categoryTitle}</h2>

                <CollectionGrid componentItems={componentItems} />
              </li>
            )
          })}
        </ul>
      </Container>
    </>
  )
}
