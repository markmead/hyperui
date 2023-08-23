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
        <link rel="stylesheet" href="/components.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

        <script src="/iframe.js"></script>
      </head>

      <body class="${componentContainer} font-sans antialiased">
        ${componentHtml}
      </body>
    </html>
  `
}

export function componentPreviewJsx(componentHtml) {
  let clonedHtml = componentHtml

  clonedHtml = clonedHtml.replace(/class=/g, 'className=')
  clonedHtml = clonedHtml.replace(/for=/g, 'htmlFor=')
  clonedHtml = clonedHtml.replace(/viewBox=/g, 'viewBox=')
  clonedHtml = clonedHtml.replace(/fill-rule=/g, 'fillRule=')
  clonedHtml = clonedHtml.replace(/fill-opacity=/g, 'fillOpacity=')
  clonedHtml = clonedHtml.replace(/clip-rule=/g, 'clipRule=')
  clonedHtml = clonedHtml.replace(/stroke-linecap=/g, 'strokeLinecap=')
  clonedHtml = clonedHtml.replace(/stroke-linejoin=/g, 'strokeLinejoin=')
  clonedHtml = clonedHtml.replace(/stroke-width=/g, 'strokeWidth=')
  clonedHtml = clonedHtml.replace(/stroke-dasharray=/g, 'strokeDasharray=')
  clonedHtml = clonedHtml.replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
  clonedHtml = clonedHtml.replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
  clonedHtml = clonedHtml.replace(/stroke-opacity=/g, 'strokeOpacity=')
  clonedHtml = clonedHtml.replace(/tabindex=/g, 'tabIndex=')
  clonedHtml = clonedHtml.replace(/<!--/g, '{/*')
  clonedHtml = clonedHtml.replace(/-->/g, '*/}')

  return clonedHtml
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

export function blogPreviewHtml(
  componentHtml,
  componentContainer = 'relative',
  isDarkMode = false
) {
  const htmlClass = isDarkMode ? 'dark' : 'relative'

  return `
    <html class="${htmlClass}">
      <head>
        <link rel="stylesheet" href="/blogs.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

        <script src="/iframe.js"></script>
      </head>

      <body class="${componentContainer} font-sans antialiased">
        ${componentHtml}
      </body>
    </html>
  `
}
