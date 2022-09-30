import { remark } from 'remark'
import html from 'remark-html'

export async function markdownToHtml(markdown: string) {
  const conversionResult = await remark().use(html).process(markdown)

  return conversionResult.toString()
}
