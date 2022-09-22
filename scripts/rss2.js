const { promises: fs } = require('fs')
const path = require('path')
const Feed = require('feed').Feed
const matter = require('gray-matter')

async function generate() {
  const feed = new Feed({
    title: 'HyperUI | Tailwind CSS Components',
    description: 'RSS feed for blog posts on HyperUI.',
    id: 'https://www.hyperui.dev/',
    link: 'https://www.hyperui.dev/',
    language: 'en',
    image: 'https://www.hyperui.dev/og.png',
    favicon: 'https://www.hyperui.dev/favicon.ico',
    feedLinks: {
      json: 'https://www.hyperui.dev/json',
      atom: 'https://www.hyperui.dev/atom',
    },
    author: {
      name: 'Mark Mead',
      link: 'https://www.markmead.dev/',
    },
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'data', 'posts'))

  await Promise.all(
    posts.map(async (name) => {
      const content = await fs.readFile(
        path.join(__dirname, '..', 'data', 'posts', name)
      )

      const frontmatter = matter(content)

      const slug = name.replace(/\.mdx?/, '')

      feed.addItem({
        title: frontmatter.data.seo.title,
        id: slug,
        link: `${feed.site_url}/blog/${slug}`,
        description: frontmatter.data.seo.description,
        content: frontmatter.content,
        author: [
          {
            name: 'Mark Mead',
            link: 'https://www.markmead.dev/',
          },
        ],
        date: new Date(frontmatter.data.date),
      })
    })
  )

  await fs.writeFile('./public/feed2.xml', feed.rss2())
}

generate()
