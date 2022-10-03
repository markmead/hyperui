export function transformComponentHtml(
  componentHtml: string,
  componentContainer: string = 'relative'
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

    <link rel="stylesheet" href="/tailwind.css">

    <body class="${componentContainer}">
      ${componentHtml}
    </body>
  `
}

export function transformComponentSlug(slug: string, category: string) {
  return slug.replace(`${category}-`, '')
}
