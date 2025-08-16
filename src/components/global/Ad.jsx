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
    <div
      id={routerPathname}
      data-ea-publisher="hyperuidev"
      data-ea-type="text"
      data-ea-style="fixedfooter"
      className="sticky! [&_.ea-body]:text-gray-900! [&_.ea-fixedfooter-hide]:hidden! [&_.ea-placement]:bg-gray-200! [&_strong]:text-sky-600!"
    ></div>
  )
}
