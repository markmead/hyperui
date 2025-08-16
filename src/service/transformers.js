export function componentPreviewHtml(
  componentHtml,
  componentContainer = 'relative',
  isRtl = false
) {
  const htmlDirection = isRtl ? 'rtl' : 'ltr'

  return `
    <html class="dark" dir="${htmlDirection}">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" />

        <script>
          document.addEventListener('DOMContentLoaded', function () {
            const iframeLinks = [...document.querySelectorAll('a')]
            const iframeForms = [...document.querySelectorAll('form')]
            const fileInputs = [...document.querySelectorAll('input[type="file"]')]

            iframeLinks.forEach(function (iframeLink) {
              iframeLink.addEventListener('click', (e) => e.preventDefault())
              iframeLink.addEventListener('keydown', (e) => e.preventDefault())
            })

            iframeForms.forEach(function (iframeForm) {
              iframeForm.addEventListener('submit', (e) => e.preventDefault())
            })

            fileInputs.forEach(function (fileInput) {
              fileInput.addEventListener('click', (e) => e.preventDefault())
              fileInput.addEventListener('keydown', (e) => e.preventDefault())
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
    .replaceAll('class=', 'className=')
    .replaceAll('for=', 'htmlFor=')
    .replaceAll('fill-rule=', 'fillRule=')
    .replaceAll('fill-opacity=', 'fillOpacity=')
    .replaceAll('clip-rule=', 'clipRule=')
    .replaceAll('stroke-linecap=', 'strokeLinecap=')
    .replaceAll('stroke-linejoin=', 'strokeLinejoin=')
    .replaceAll('stroke-width=', 'strokeWidth=')
    .replaceAll('stroke-dasharray=', 'strokeDasharray=')
    .replaceAll('stroke-dashoffset=', 'strokeDashoffset=')
    .replaceAll('stroke-miterlimit=', 'strokeMiterlimit=')
    .replaceAll('stroke-opacity=', 'strokeOpacity=')
    .replaceAll('tabindex=', 'tabIndex=')
    .replaceAll('readonly=', 'readOnly=')
    .replaceAll('maxlength=', 'maxLength=')
    .replaceAll('minlength=', 'minLength=')
    .replaceAll('autocomplete=', 'autoComplete=')
    .replaceAll('<!--', '{/*')
    .replaceAll('-->', '*/}')
}

export function componentPreviewVue(componentHtml) {
  const templateWrappedHtml = `<template>\n${componentHtml}</template>`

  return templateWrappedHtml
    .split('\n')
    .map((codeLine) => {
      if (codeLine.includes('<template>') || codeLine.includes('</template>')) {
        return codeLine.trim()
      }

      return `  ${codeLine}`
    })
    .join('\n')
}
