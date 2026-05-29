;(() => {
  function getRuntimeConfig() {
    const scriptEl = globalThis.document.currentScript

    const allowedOrigin =
      (scriptEl instanceof HTMLScriptElement ? scriptEl.dataset.previewOrigin : '') ||
      globalThis.__HYPERUI_PREVIEW_ORIGIN ||
      ''

    const previewMessageType =
      (scriptEl instanceof HTMLScriptElement ? scriptEl.dataset.previewMessageType : '') ||
      globalThis.__HYPERUI_PREVIEW_MESSAGE_TYPE ||
      ''

    if (!allowedOrigin || !previewMessageType) {
      return null
    }

    return { allowedOrigin, previewMessageType }
  }

  function applyDirection(directionValue) {
    const incomingDirection = directionValue === 'rtl' ? 'rtl' : 'ltr'

    globalThis.document.documentElement.setAttribute('dir', incomingDirection)
  }

  function isPreviewDirectionMessage(messageEvent, allowedOrigin, previewMessageType) {
    if (messageEvent.source !== globalThis.parent) {
      return false
    }

    if (messageEvent.origin !== allowedOrigin) {
      return false
    }

    if (
      !messageEvent.data ||
      typeof messageEvent.data !== 'object' ||
      messageEvent.data.type !== previewMessageType
    ) {
      return false
    }

    return true
  }

  function initPreviewDirectionListener() {
    const runtimeConfig = getRuntimeConfig()

    if (!runtimeConfig) {
      return
    }

    const { allowedOrigin, previewMessageType } = runtimeConfig

    globalThis.addEventListener('message', (messageEvent) => {
      if (!isPreviewDirectionMessage(messageEvent, allowedOrigin, previewMessageType)) {
        return
      }

      applyDirection(messageEvent.data.direction)
    })
  }

  if (globalThis.document.readyState === 'loading') {
    globalThis.document.addEventListener('DOMContentLoaded', initPreviewDirectionListener, {
      once: true,
    })

    return
  }

  initPreviewDirectionListener()
})()
