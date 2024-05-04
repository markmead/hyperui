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

        <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>

        <script>
          tailwind.config = {
            darkMode: 'class',
            safelist: ['keen-slider', 'keen-slider__slide'],
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter'],
                },
                animation: {
                  background: 'background ease infinite',
                },
                keyframes: {
                  background: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                  },
                },
              },
            },
          }
        </script>
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

        <script src="https://cdn.tailwindcss.com?plugins=forms,typography"></script>

        <script>
          tailwind.config = {
            darkMode: 'class',
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter'],
                },
                animation: {
                  background: 'background ease infinite',
                },
                keyframes: {
                  background: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                  },
                },
              },
              textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
              },
            },
          }
        </script>
      </head>

      <body class="${componentContainer} font-sans antialiased">
        ${componentHtml}
      </body>
    </html>
  `
}
