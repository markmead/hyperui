'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Ad() {
  const routerPathname: string = usePathname()

  useEffect(() => {
    loadAd()
  }, [routerPathname])

  function loadAd(): void {
    if (document.getElementById('EthicalAds')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const appWindow = window as any

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      appWindow && appWindow.ethicalads && appWindow.ethicalads.reload()

      return
    }

    const newScript: HTMLScriptElement = document.createElement('script')

    newScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    newScript.async = true
    newScript.id = 'EthicalAds'

    document.body.appendChild(newScript)
  }

  return (
    <div className="not-prose mx-auto max-w-lg text-center">
      <div
        data-ea-publisher="hyperuidev"
        data-ea-type="image"
        data-ea-style="stickybox"
        className="bordered horizontal [&_.ea-callout]:mb-0! [&_.ea-content]:mx-0! [&_.ea-content]:mt-0! [&_.ea-stickybox-hide]:hidden"
      />
    </div>
  )
}
