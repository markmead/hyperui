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
        <script src="/iframe.js"></script>
      </head>

      <body class="${componentContainer}">
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
  clonedHtml = clonedHtml.replace(/<!--/g, '{/*')
  clonedHtml = clonedHtml.replace(/-->/g, '*/}')

  return clonedHtml
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
        <script src="/iframe.js"></script>
      </head>

      <body class="${componentContainer}">
        ${componentHtml}
      </body>
    </html>
  `
}
