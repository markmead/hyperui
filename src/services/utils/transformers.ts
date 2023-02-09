export function componentHtml(
  componentHtml: string,
  componentContainer: string = 'relative',
  isDarkMode: boolean = false
) {
  return `
    <html class="${isDarkMode && 'dark'}">
      <head>
        <link rel="stylesheet" href="/components.css">
        <script src="/components.js"></script>
      </head>

      <body class="${componentContainer}">
        ${componentHtml}
      </body>
    </html>
  `
}

export function componentSlug(
  componentSlug: string,
  componentCategory: string
) {
  return componentSlug.replace(`${componentCategory}-`, '')
}
