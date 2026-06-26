import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const BODY_CONTENT_PATTERN = /<body[^>]*>([\s\S]*?)<\/body>/i

export function readComponentMarkup(componentSrc: string): string {
  try {
    const componentFilePath = join(process.cwd(), 'public', componentSrc)
    const rawFileContent = readFileSync(componentFilePath, 'utf-8')

    const bodyContentMatch = rawFileContent.match(BODY_CONTENT_PATTERN)

    if (!bodyContentMatch) {
      return ''
    }

    return bodyContentMatch[1]
      .split('\n')
      .map((markupLine) => markupLine.replace(/^\s{4}/, ''))
      .join('\n')
      .trim()
  } catch {
    return ''
  }
}
