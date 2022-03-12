export function source(html: string, spacing: string = 'relative') {
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
