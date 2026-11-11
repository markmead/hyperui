import type { APIRoute, GetStaticPaths } from 'astro'

import { getCollection } from 'astro:content'

import {
  COMPONENT_CATEGORIES,
  renderBlogIndexMarkdown,
  renderBlogPostMarkdown,
  renderCategoryMarkdown,
  renderComponentMarkdown,
  renderHomeMarkdown,
  renderToolMarkdown,
  renderToolsMarkdown,
} from '../utils/markdown'

/**
 * Markdown twins of the HTML pages, served at `{path}.md` (the home page is
 * `/index.md`). The worker in `src/worker.ts` serves these to clients that
 * send `Accept: text/markdown`.
 */
export const getStaticPaths = (async () => {
  const paths: { params: { path: string }; props: { markdown: string } }[] = [
    { params: { path: 'index' }, props: { markdown: await renderHomeMarkdown() } },
    { params: { path: 'blog' }, props: { markdown: await renderBlogIndexMarkdown() } },
    { params: { path: 'tools' }, props: { markdown: await renderToolsMarkdown() } },
  ]

  for (const category of COMPONENT_CATEGORIES) {
    paths.push({
      params: { path: `components/${category}` },
      props: { markdown: await renderCategoryMarkdown(category) },
    })

    for (const entry of await getCollection(category)) {
      paths.push({
        params: { path: `components/${category}/${entry.data.slug}` },
        props: { markdown: renderComponentMarkdown(entry) },
      })
    }
  }

  for (const tool of await getCollection('tools')) {
    if (!tool.data.href) {
      continue
    }

    paths.push({
      params: { path: tool.data.href.replace(/^\//, '') },
      props: { markdown: renderToolMarkdown(tool) },
    })
  }

  for (const post of await getCollection('blog')) {
    paths.push({
      params: { path: `blog/${post.data.slug}` },
      props: { markdown: renderBlogPostMarkdown(post) },
    })
  }

  return paths
}) satisfies GetStaticPaths

export const GET: APIRoute = ({ props }) =>
  new Response(props.markdown as string, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
