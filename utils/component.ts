export function markup(html: string, spacing: string) {
  return `
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        let links = [...document.querySelectorAll('a')]

        links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()))
      })
    </script>

    <link rel="stylesheet" href="${origin}/build.css">

    <body class="${spacing}">
      ${html}
    </body>
  `
}
