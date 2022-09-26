const { promises: fs } = require('fs')
const path = require('path')
const matter = require('gray-matter')

async function generate() {
  const componentsDirectory = path.join(__dirname, '..', 'data', 'components')
  const componentSlugs = await fs.readdir(componentsDirectory)

  let searchObject = {
    title: 'HyperUI Search',
    updated: new Date(),
    items: [],
  }

  await Promise.all(
    componentSlugs.map(async (slug) => {
      const realSlug = slug.replace(/\.mdx$/, '')
      const fullPath = path.join(componentsDirectory, slug)
      const componentContent = await fs.readFile(fullPath)
      const componentFrontmatter = matter(componentContent)
      const { data: componentData } = componentFrontmatter

      return {
        slug: realSlug.replace(`${componentData.category}-`, ''),
        name: componentData.title,
        category: componentData.category,
        id: realSlug,
      }
    })
  ).then((componentData) => {
    searchObject.items = componentData
  })

  await fs.writeFile('./public/search.json', JSON.stringify(searchObject))
}

generate()
