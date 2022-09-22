const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

async function generate() {
  const feed = new RSS({
    title: 'HyperUI | Tailwind CSS Components',
    site_url: 'https://www.hyperui.dev',
    feed_url: 'https://www.hyperui.dev/feed.xml',
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'data', 'posts'))

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'data', 'posts', name)
      )
      const frontmatter = matter(content)

      feed.item({
        title: frontmatter.data.title,
        url: `${feed.site_url}/blog/${name.replace(/\.mdx?/, '')}`,
        date: frontmatter.data.date,
        // description: frontmatter.data.seo.description,
        author: 'HyperUI',
        description: frontmatter.content,
      })
    })
  )

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
