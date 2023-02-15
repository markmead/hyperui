export function componentSlug(
  componentSlug: string,
  componentCategory: string
) {
  return componentSlug.replace(`${componentCategory}-`, '')
}

export function componentPreviewHtml(
  componentHtml: string,
  componentContainer: string = 'relative',
  isDarkMode: boolean = false,
  isRtl: boolean = false
) {
  const htmlClass = isDarkMode ? 'dark' : 'relative'
  const htmlDirection = isRtl ? 'rtl' : 'ltr'

  return `
    <html class="${htmlClass}" dir="${htmlDirection}">
      <head>
        <link rel="stylesheet" href="/components.css">
        <script src="/iframe.js"></script>
      </head>

      <body class="${componentContainer}">
        ${componentHtml}
      </body>
    </html>
  `
}

export function blogPreviewHtml(componentHtml: string) {
  return `
    <html>
      <head>
        <link rel="stylesheet" href="/blogs.css">
        <script src="/iframe.js"></script>
      </head>

      <body>
        ${componentHtml}
      </body>
    </html>
  `
}
