const { promises: fs } = require('fs')
const path = require('path')
const Feed = require('feed').Feed
const matter = require('gray-matter')

async function generate() {
  const rssFeed = new Feed({
    title: 'HyperUI | Tailwind CSS Components',
    description: 'RSS feed for blog posts on HyperUI.',
    id: 'https://www.hyperui.dev/',
    link: 'https://www.hyperui.dev/feed.xml',
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

  const selfPosts = await fs.readdir(
    path.join(__dirname, '..', 'data', 'posts')
  )

  await Promise.all(
    selfPosts.map(async (name) => {
      const postContent = await fs.readFile(
        path.join(__dirname, '..', 'data', 'posts', name)
      )

      const postFrontmatter = matter(postContent)
      const { data: postData } = postFrontmatter

      const postSlug = name.replace(/\.mdx?/, '')

      rssFeed.addItem({
        title: postData.seo.title,
        id: postSlug,
        link: `https://www.hyperui.dev/blog/${postSlug}`,
        description: postData.seo.description,
        content: postData.content,
        author: [
          {
            name: 'Mark Mead',
            link: 'https://www.markmead.dev/',
          },
        ],
        date: new Date(postData.date),
      })
    })
  )

  await fs.writeFile('./public/rss.xml', rssFeed.rss2())
  await fs.writeFile('./public/rss.json', rssFeed.json1())
  await fs.writeFile('./public/rss.atom', rssFeed.atom1())
}

generate()
