export function transformComponentHtml(
  componentHtml: string,
  componentContainer: string = 'relative',
  isDarkMode: boolean = false,
  isEditorMode: boolean = false
) {
  return `
    <html class="${isDarkMode ? 'dark' : 'relative'}">
      <head>
        <script>
          document.addEventListener('DOMContentLoaded', () => {
            let links = [...document.querySelectorAll('a')]
            let forms = [...document.querySelectorAll('form')]

            links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
            forms.forEach(form => form.addEventListener('submit', (e) => e.preventDefault()))
          })
        </script>

        ${
          isEditorMode
            ? '<script src="https://cdn.tailwindcss.com?plugins=forms,typography,line-clamp"></script>'
            : '<link rel="stylesheet" href="/components.css">'
        }

        ${
          isEditorMode
            ? '<script>tailwind.config = { darkMode: "class" }</script>'
            : ''
        }
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
