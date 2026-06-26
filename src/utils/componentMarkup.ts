const BODY_CONTENT_PATTERN = /<body[^>]*>([\s\S]*?)<\/body>/i

const rawComponentFiles = import.meta.glob('../../public/examples/**/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const componentMarkupBySrc: Record<string, string> = {}

for (const [filePath, fileContent] of Object.entries(rawComponentFiles)) {
  const normalizedSrc = filePath.replace(/^.*\/public/, '')

  componentMarkupBySrc[normalizedSrc] = fileContent
}

export function readComponentMarkup(componentSrc: string): string {
  const rawFileContent = componentMarkupBySrc[componentSrc]

  if (!rawFileContent) {
    return ''
  }

  const bodyContentMatch = rawFileContent.match(BODY_CONTENT_PATTERN)

  if (!bodyContentMatch) {
    return ''
  }

  return bodyContentMatch[1]
    .split('\n')
    .map((markupLine) => markupLine.replace(/^\s{4}/, ''))
    .join('\n')
    .trim()
}
