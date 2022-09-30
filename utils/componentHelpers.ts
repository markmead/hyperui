export function transformComponentHtml(
  componentHtml: string,
  componentSpacing: string = 'relative'
) {
  return `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        let links = [...document.querySelectorAll('a')]
        let forms = [...document.querySelectorAll('form')]

        links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
        forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))
      })
    </script>

    <link rel="stylesheet" href="/build.css">

    <body class="${componentSpacing}">
      ${componentHtml}
    </body>
  `
}

export function transformComponentSlug(slug: string, category: string) {
  return slug.replace(`${category}-`, '')
}
