export function buildPreviewDocument(htmlContent, isDarkMode) {
  const backgroundColor = isDarkMode ? '#111827' : '#ffffff'
  const scriptOpenTag = ['<', 'script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4">'].join('')
  const scriptCloseTag = ['</', 'script>'].join('')

  return [
    '<!doctype html>',
    `<html lang="en"${isDarkMode ? ' class="dark"' : ''}>`,
    '<head>',
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width,initial-scale=1" />',
    scriptOpenTag + scriptCloseTag,
    '<style type="text/tailwindcss">@custom-variant dark (&:where(.dark, .dark *));</style>',
    `<style>body{padding:1rem;background:${backgroundColor};}</style>`,
    '</head>',
    `<body>${htmlContent}</body>`,
    '</html>',
  ].join('\n')
}
