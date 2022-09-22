const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')
// const { remark } = 'remark'
// const html = 'remark-html'

async function getRemark() {
  const { remark } = await import('remark')
  return remark
}

async function getRemarkHtml() {
  const html = await import('remark-html')
  return html
}

async function generate() {
  const feed = new RSS({
    title: 'HyperUI | Tailwind CSS Components',
    site_url: 'https://www.hyperui.dev',
    feed_url: 'https://www.hyperui.dev/feed.xml',
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'data', 'posts'))

  const processor = await getRemark()
  const egg = await getRemarkHtml()

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'data', 'posts', name)
      )

      const frontmatter = matter(content)

      const mdAsHtml = await processor().use(egg).process(frontmatter.content)

      feed.item({
        title: frontmatter.data.seo.title,
        description: frontmatter.data.seo.description,
        url: `${feed.site_url}/blog/${name.replace(/\.mdx?/, '')}`,
        date: frontmatter.data.date,
        author: 'HyperUI',
        categories: ['tailwindcss', 'css'],
        custom_elements: [{ content: frontmatter.content }],
      })
    })
  )

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
