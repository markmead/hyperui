const { promises: fs } = require('fs')
const path = require('path')
const matter = require('gray-matter')

async function generateSearchData() {
  const componentsDirectory = path.join(process.cwd(), '/src/data/components')
  const componentSlugs = await fs.readdir(componentsDirectory)

  const categoriesDirectory = path.join(process.cwd(), '/src/data/categories')
  const categorySlugs = await fs.readdir(categoriesDirectory)

  const searchObject = {
    title: 'Component Search | HyperUI',
    description: 'JSON data for Tailwind CSS component searching on HyperUI.',
    items: [],
  }

  const categoryData = await Promise.all(
    categorySlugs.map(async (slug) => {
      const realSlug = slug.replace(/\.mdx$/, '')
      const fullPath = path.join(categoriesDirectory, slug)
      const categoryContent = await fs.readFile(fullPath)
      const categoryFrontmatter = matter(categoryContent)
      const { data: categoryData } = categoryFrontmatter

      return {
        slug: realSlug,
        ...categoryData,
      }
    })
  )

  await Promise.all(
    componentSlugs.map(async (slug) => {
      const realSlug = slug.replace(/\.mdx$/, '')
      const fullPath = path.join(componentsDirectory, slug)
      const componentContent = await fs.readFile(fullPath)
      const componentFrontmatter = matter(componentContent)
      const { data: componentData } = componentFrontmatter

      const componentCategory = categoryData.filter(
        (categoryItem) => categoryItem.slug === componentData.category
      )[0]

      return {
        slug: realSlug.replace(`${componentData.category}-`, ''),
        name: componentData.title,
        category: {
          slug: componentCategory.slug,
          title: componentCategory.title,
        },
        id: realSlug,
      }
    })
  ).then((componentData) => {
    searchObject.items = componentData
  })

  await fs.writeFile('./public/search.json', JSON.stringify(searchObject))
}

generateSearchData()
