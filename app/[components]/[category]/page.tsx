import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'

import CollectionGrid from '@component/CollectionGrid'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'

import { iPageProps, iCategoryPage } from '@type/page'
import { iPageMeta } from '@type/site'
import { iCategoryItem, iCollectionItem } from '@type/component'

interface iCollectionData
  extends Omit<iCollectionItem, 'container' | 'wrapper' | 'seo' | 'components'> {
  slug: string
  count: number
}

interface iPageParams {
  category: string
}

interface iPageData {
  categoryData: Partial<iCategoryItem>
  componentItems: iCollectionData[]
}

export async function generateMetadata(props: iPageProps): Promise<iPageMeta> {
  const params: Awaited<iPageParams> = await props.params

  const { categoryData }: Awaited<{ categoryData: Partial<iCategoryPage> }> =
    await getCategory(params)

  return {
    title: `Tailwind CSS ${categoryData.title} Components | HyperUI`,
    description: categoryData.description,
    alternates: {
      canonical: `/components/${params.category}`,
    },
  }
}

async function getCategory(params: iPageParams): Promise<iPageData> {
  try {
    const componentsPath: string = join(process.cwd(), '/src/data/components')
    const categoriesPath: string = join(process.cwd(), '/src/data/categories')

    const categorySlug: string = params.category
    const categoryPath: string = join(categoriesPath, `${categorySlug}.mdx`)

    const componentSlugs: Awaited<string[]> = await fs.readdir(componentsPath)
    const categoryItem: Awaited<string> = await fs.readFile(categoryPath, 'utf-8')

    const { frontmatter: categoryData }: Awaited<{ frontmatter: iCategoryItem }> = await serialize(
      categoryItem,
      { parseFrontmatter: true }
    )

    const componentItems: Awaited<iCollectionData[]> = await Promise.all(
      componentSlugs
        .filter((componentSlug) => componentSlug.includes(categorySlug))
        .map(async (componentSlug) => {
          const componentPath: string = join(componentsPath, componentSlug)
          const componentItem: Awaited<string> = await fs.readFile(componentPath, 'utf-8')

          const { frontmatter: componentData }: Awaited<{ frontmatter: iCollectionItem }> =
            await serialize(componentItem, { parseFrontmatter: true })

          const componentSlugFormatted: string = componentSlug.replace('.mdx', '')
          const componentSlugTrue: string = componentSlugFormatted.replace(`${categorySlug}-`, '')
          const componentCount: number = Object.values(componentData.components).length

          return {
            title: componentData.title,
            slug: componentSlugTrue,
            category: componentData.category,
            emoji: componentData.emoji,
            count: componentCount,
            tag: componentData.tag,
            id: componentSlugFormatted,
          }
        })
    )

    componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

    return {
      categoryData,
      componentItems,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props: iPageProps) {
  const params: Awaited<iPageParams> = await props.params

  const { categoryData, componentItems }: Awaited<iPageData> = await getCategory(params)

  return (
    <>
      <HeroBanner title={categoryData.title} subtitle={categoryData.subtitle}>
        {categoryData.description}
      </HeroBanner>

      <Container id="mainContent" classNames="pb-8 lg:pb-12 space-y-8">
        <CollectionGrid componentItems={componentItems} />
      </Container>
    </>
  )
}
