document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.closest('a, input[type="file"]')) {
      e.preventDefault()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' && e.target.closest('a, input[type="file"]')) {
      e.preventDefault()
    }
  })

  document.addEventListener('submit', (e) => {
    e.preventDefault()
  })

  globalThis.addEventListener('message', (event) => {
    if (event.source !== globalThis.parent) {
      return
    }

    if (event.origin !== globalThis.location.origin) {
      return
    }

    if (typeof event.data !== 'object' || event.data === null) {
      return
    }

    if (event.data.type !== 'hyperui:preview-direction' || typeof event.data.ltr !== 'boolean') {
      return
    }

    document.documentElement.setAttribute('dir', event.data.ltr ? 'ltr' : 'rtl')
  })
})
