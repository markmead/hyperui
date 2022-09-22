const { promises: fs } = require('fs')
const path = require('path')
const Feed = require('feed').Feed
const matter = require('gray-matter')

async function generate() {
  const rssFeed = new Feed({
    title: 'HyperUI | Tailwind CSS Components',
    description: 'RSS feed.',
    id: 'https://www.hyperui.dev/',
    link: 'https://www.hyperui.dev/rss.xml',
    language: 'en',
    image: 'https://www.hyperui.dev/og.png',
    favicon: 'https://www.hyperui.dev/favicon.ico',
    feedLinks: {
      xml: 'https://www.hyperui.dev/rss.xml',
      json: 'https://www.hyperui.dev/rss.json',
      atom: 'https://www.hyperui.dev/rss.atom',
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
      const { data: postData, content: postMarkdown } = postFrontmatter

      const postSlug = name.replace(/\.mdx?/, '')

      const convertedPostTags = postData.tags.map((postTag) => ({
        name: postTag,
      }))

      rssFeed.addItem({
        title: postData.title,
        id: postSlug,
        link: `https://www.hyperui.dev/blog/${postSlug}`,
        description: postData.description,
        content: postMarkdown,
        author: [
          {
            name: 'Mark Mead',
            link: 'https://www.markmead.dev/',
          },
        ],
        date: new Date(postData.date),
        category: convertedPostTags,
      })
    })
  )

  await fs.writeFile('./public/rss.xml', rssFeed.rss2())
  await fs.writeFile('./public/rss.json', rssFeed.json1())
  await fs.writeFile('./public/rss.atom', rssFeed.atom1())
}

generate()
