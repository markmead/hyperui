'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Ads() {
  const routerPathname = usePathname()

  useEffect(() => {
    loadAd()
  }, [routerPathname])

  function loadAd() {
    if (document.getElementById('EthicalAds')) {
      window && window.ethicalads && window.ethicalads.reload()

      return
    }

    const newScript = document.createElement('script')

    newScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    newScript.async = true
    newScript.id = 'EthicalAds'

    document.body.appendChild(newScript)
  }

  return (
    <div
      data-ea-publisher="hyperuidev"
      data-ea-type="text"
      data-ea-style="fixedfooter"
      className="[&_.ea-callout]:mb-0! [&_.ea-content]:mx-0! [&_.ea-content]:mt-0! [&_.ea-fixedfooter-hide]:hidden [&_.ea-stickybox-hide]:hidden"
    ></div>
  )
}
