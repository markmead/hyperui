'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Ads() {
  const routerPathname = usePathname()

  useEffect(() => {
    loadAd()
  }, [routerPathname])

  function loadAd() {
    if (document.querySelector('#EthicalAds')) {
      globalThis && globalThis.ethicalads && globalThis.ethicalads.reload()

      return
    }

    const adScript = document.createElement('script')

    adScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    adScript.async = true
    adScript.id = 'EthicalAds'

    document.body.append(adScript)
  }

  return (
    <div className="not-prose mx-auto max-w-sm">
      <div
        id={routerPathname}
        data-ea-publisher="hyperuidev"
        data-ea-type="image"
        className="horizontal [&_.ea-callout]:mx-0! [&_.ea-callout]:mt-1! [&_.ea-callout]:mb-0! [&_.ea-callout]:max-w-none! [&_.ea-callout]:px-2! [&_.ea-content]:m-0! [&_.ea-content]:max-w-none! [&_.ea-content]:rounded-lg! [&_.ea-content]:border! [&_.ea-content]:border-stone-300! [&_.ea-content]:bg-stone-50! [&_.ea-content]:shadow-sm! [&_.ea-content>a>img]:rounded-md!"
      ></div>
    </div>
  )
}
