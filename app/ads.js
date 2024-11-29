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
      if (window?.ethicalads) {
        window.ethicalads.wait.then((adPlacements) => {
          // Do not reload if there are no ad placements
          if (!adPlacements.length) {
            return
          }

          window.ethicalads.reload()
        })

        return
      }

      return
    }

    const newScript = document.createElement('script')

    newScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    newScript.async = true
    newScript.id = 'EthicalAds'

    document.body.appendChild(newScript)
  }
}
