import type { APIRoute, GetStaticPaths } from 'astro'

import { getMarkdownPages } from '../utils/markdown'

/**
 * Markdown versions of the HTML pages, prerendered at `{path}.md` (the home
 * page is `/index.md`). Each HTML page links to its version with
 * `<link rel="alternate" type="text/markdown">`.
 */
export const getStaticPaths = (async () =>
  (await getMarkdownPages()).map(({ path, markdown }) => ({
    params: { path },
    props: { markdown },
  }))) satisfies GetStaticPaths

export const GET: APIRoute = ({ props }) =>
  new Response(props.markdown as string, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
