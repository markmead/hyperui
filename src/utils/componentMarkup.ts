const BODY_CONTENT_PATTERN = /<body[^>]*>([\s\S]*?)<\/body>/i

const rawComponentFileMap = import.meta.glob('../../public/examples/**/*.html', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const componentMarkupMap: Record<string, string> = {}

for (const [filePath, fileContent] of Object.entries(rawComponentFileMap)) {
  const normalizedSrc = filePath.replace(/^.*\/public/, '')

  componentMarkupMap[normalizedSrc] = fileContent
}

export function readComponentMarkup(componentSrc: string): string {
  const rawFileContent = componentMarkupMap[componentSrc]

  if (!rawFileContent) {
    return ''
  }

  const bodyContentMatch = rawFileContent.match(BODY_CONTENT_PATTERN)

  if (!bodyContentMatch) {
    return ''
  }

  return (bodyContentMatch[1] ?? '')
    .split('\n')
    .map((markupLine) => markupLine.replace(/^\s{4}/, ''))
    .join('\n')
    .trim()
}
