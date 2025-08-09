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
      id={routerPathname}
      data-ea-publisher="hyperuidev"
      data-ea-type="text"
      data-ea-style="fixedfooter"
      className="sticky! [&_.ea-body]:text-gray-900! [&_.ea-fixedfooter-hide]:hidden! [&_.ea-placement]:bg-gray-200! [&_strong]:text-sky-600!"
    ></div>
  )
}
