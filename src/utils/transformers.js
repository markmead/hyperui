export function componentPreviewHtml(
  componentHtml,
  componentContainer = 'relative',
  isDarkMode = false,
  isRtl = false
) {
  const htmlClass = isDarkMode ? 'dark' : 'relative'
  const htmlDirection = isRtl ? 'rtl' : 'ltr'

  return `
    <html class="${htmlClass}" dir="${htmlDirection}">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" />

        <script>
          document.addEventListener('DOMContentLoaded', function () {
            const iframeLinks = [...document.querySelectorAll('a')]
            const iframeForms = [...document.querySelectorAll('form')]

            iframeLinks.forEach(function (iframeLink) {
              iframeLink.addEventListener('click', (e) => e.preventDefault())
            })

            iframeForms.forEach(function (iframeForm) {
              iframeForm.addEventListener('submit', (e) => e.preventDefault())
            })
          })
        </script>

        <link href="/components.css" rel="stylesheet">
      </head>

      <body class="${componentContainer} font-sans antialiased">
        ${componentHtml}
      </body>
    </html>
  `
}

export function componentPreviewJsx(componentHtml) {
  return componentHtml
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/viewBox=/g, 'viewBox=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/fill-opacity=/g, 'fillOpacity=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stroke-opacity=/g, 'strokeOpacity=')
    .replace(/tabindex=/g, 'tabIndex=')
    .replace(/<!--/g, '{/*')
    .replace(/-->/g, '*/}')
}

export function componentPreviewVue(componentHtml) {
  const newComponentHtml = `<template>\n${componentHtml}</template>`
  const formattedComponentHtml = newComponentHtml
    .split('\n')
    .map((codeLine) => {
      if (codeLine.includes('<template>') || codeLine.includes('</template>')) {
        return codeLine.trim()
      }

      return `  ${codeLine}`
    })
    .join('\n')

  return formattedComponentHtml
}
