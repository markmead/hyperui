/**
 * The prerendered Markdown version of a page lives at `{path}.md`, and the
 * home page at `/index.md` (see `src/pages/[...path].md.ts`).
 */
export function markdownPathFor(pathname: string): string {
  const trimmed = pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '')

  return trimmed === '' ? '/index.md' : `${trimmed}.md`
}
