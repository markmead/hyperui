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
            document.querySelectorAll('a').forEach(function (iframeLink) {
              iframeLink.addEventListener('click', (e) => e.preventDefault())
              iframeLink.addEventListener('keydown', (e) => e.preventDefault())
            })

            document.querySelectorAll('form').forEach(function (iframeForm) {
              iframeForm.addEventListener('submit', (e) => e.preventDefault())
            })

            document.querySelectorAll('input[type="file"]').forEach(function (fileInput) {
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
  const attributeMap = {
    'class=': 'className=',
    'for=': 'htmlFor=',
    'fill-rule=': 'fillRule=',
    'fill-opacity=': 'fillOpacity=',
    'clip-rule=': 'clipRule=',
    'stroke-linecap=': 'strokeLinecap=',
    'stroke-linejoin=': 'strokeLinejoin=',
    'stroke-width=': 'strokeWidth=',
    'stroke-dasharray=': 'strokeDasharray=',
    'stroke-dashoffset=': 'strokeDashoffset=',
    'stroke-miterlimit=': 'strokeMiterlimit=',
    'stroke-opacity=': 'strokeOpacity=',
    'tabindex=': 'tabIndex=',
    'readonly=': 'readOnly=',
    'maxlength=': 'maxLength=',
    'minlength=': 'minLength=',
    'autocomplete=': 'autoComplete=',
    '<!--': '{/*',
    '-->': '*/}',
  }

  const attributePattern =
    /class=|for=|fill-rule=|fill-opacity=|clip-rule=|stroke-linecap=|stroke-linejoin=|stroke-width=|stroke-dasharray=|stroke-dashoffset=|stroke-miterlimit=|stroke-opacity=|tabindex=|readonly=|maxlength=|minlength=|autocomplete=|<!--|-->/g

  return componentHtml.replaceAll(
    attributePattern,
    (attributeMatch) => attributeMap[attributeMatch]
  )
}

export function componentPreviewVue(componentHtml) {
  const templateWrappedHtml = `<template>\n${componentHtml}</template>`

  return templateWrappedHtml
    .split('\n')
    .map((codeLine) => {
      const isTemplateTag = codeLine.includes('<template>') || codeLine.includes('</template>')

      return isTemplateTag ? codeLine.trim() : `  ${codeLine}`
    })
    .join('\n')
}
