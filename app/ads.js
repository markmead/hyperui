'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { useInterval } from 'react-use'

export default function Ads() {
  const routerPathname = usePathname()

  const staticIntervalDelay = 30000

  const [intervalDelay, setIntervalDelay] = useState(staticIntervalDelay)

  useEffect(() => {
    loadAd()
  }, [routerPathname])

  useEffect(() => {
    document.addEventListener('preview:clicked', loadAd)
  }, [])

  useInterval(() => {
    loadAd()
  }, intervalDelay)

  function restartInterval() {
    setIntervalDelay(null)

    setTimeout(() => setIntervalDelay(staticIntervalDelay), 1000)
  }

  function loadAd() {
    restartInterval()

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
