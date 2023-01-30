export function transformComponentHtml(
  componentHtml: string,
  componentContainer: string = 'relative',
  isDarkMode: boolean = false
) {
  return `
    <html class="${isDarkMode && 'dark'}">
      <head>
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            let links = [...document.querySelectorAll('a')]
            let forms = [...document.querySelectorAll('form')]

            links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
            forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))
          })
        </script>

        <link rel="stylesheet" href="/components.css">
      </head>

      <body class="${componentContainer}">
        ${componentHtml}
      </body>
    </html>
  `
}

export function transformComponentSlug(
  componentSlug: string,
  componentCategory: string
) {
  return componentSlug.replace(`${componentCategory}-`, '')
}
