'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Ads() {
  const routerPathname = usePathname()

  useEffect(() => {
    loadAd()
  }, [routerPathname])

  function loadAd() {
    const isDevelopment = process.env.NODE_ENV === 'development'

    if (isDevelopment) {
      return
    }

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
}
