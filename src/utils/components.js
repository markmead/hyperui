import matter from 'gray-matter'

import { join } from 'path'
import { promises as fs } from 'fs'
import { serialize } from 'next-mdx-remote/serialize'

export async function getCategoryPaths() {
  const categoriesPath = join(process.cwd(), '/src/data/categories')
  const categoryFiles = await fs.readdir(categoriesPath)

  const categoryPaths = categoryFiles.map((categoryFile) => {
    return {
      params: {
        category: categoryFile.replace(/\.mdx$/, ''),
      },
    }
  })

  return categoryPaths
}

export async function getComponentPaths() {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const componentFiles = await fs.readdir(componentsPath)

  const categorySlugs = ['application-ui', 'marketing']

  const componentPaths = componentFiles.map((componentFile) => {
    const categorySlug = categorySlugs.find((slug) => componentFile.includes(slug))
    const componentSlug = componentFile.replace(`${categorySlug}-`, '').replace('.mdx', '')

    return {
      params: {
        category: categorySlug,
        slug: componentSlug,
      },
    }
  })

  return componentPaths
}

export async function getComponents() {
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
              category: componentData.category,
              emoji: componentData.emoji,
              count: componentCount,
              tag: componentData?.tag || '',
              id: componentSlugFormatted,
            }
          })
      )

      componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

      return {
        categoryData,
        componentItems,
      }
    })
  )

  return componentsByCategory
}

export async function getComponent(params) {
  const componentsDirectory = join(process.cwd(), '/src/data/components')
  const componentPath = join(componentsDirectory, `${params.category}-${params.slug}.mdx`)

  const componentItem = await fs.readFile(componentPath, 'utf-8')

  const { content, data: frontmatter } = matter(componentItem)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: frontmatter,
  })

  return {
    componentData: {
      ...frontmatter,
      slug: params.slug,
    },
    componentContent: mdxSource,
  }
}

export async function getCategory(params) {
  const componentsPath = join(process.cwd(), '/src/data/components')
  const categoriesPath = join(process.cwd(), '/src/data/categories')

  const categorySlug = params.category
  const categoryPath = join(categoriesPath, `${categorySlug}.mdx`)

  const componentSlugs = await fs.readdir(componentsPath)
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
        const componentSlugTrue = componentSlugFormatted.replace(`${categorySlug}-`, '')
        const componentCount = Object.values(componentData.components).length

        return {
          title: componentData.title,
          slug: componentSlugTrue,
          category: componentData.category,
          emoji: componentData.emoji,
          count: componentCount,
          tag: componentData?.tag || '',
          id: componentSlugFormatted,
        }
      })
  )

  componentItems.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title))

  return {
    categoryData,
    componentItems,
  }
}

export async function getCategoriesSitemap() {
  const categorySlugs = ['application-ui', 'marketing']

  return await Promise.all(categorySlugs.map(async (categorySlug) => `components/${categorySlug}`))
}

export async function getComponentsSitemap() {
  const componentsPath = join(process.cwd(), '/src/data/components')

  const categorySlugs = ['application-ui', 'marketing']
  const componentSlugs = await fs.readdir(componentsPath)

  const componentsByCategory = await Promise.all(
    categorySlugs.map(async (categorySlug) => {
      const componentItems = await Promise.all(
        componentSlugs
          .filter((componentSlug) => componentSlug.includes(categorySlug))
          .map(async (componentSlug) => {
            const componentSlugFormatted = componentSlug.replace('.mdx', '')
            const componentSlugTrue = componentSlugFormatted.replace(`${categorySlug}-`, '')

            return `components/${categorySlug}/${componentSlugTrue}`
          })
      )

      return componentItems
    })
  )

  return componentsByCategory.flatMap((componentItem) => componentItem)
}
