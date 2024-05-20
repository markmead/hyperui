'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { useHash } from 'react-use'

export default function Ads() {
  const routerPathname = usePathname()
  const [hash] = useHash()

  useEffect(() => {
    const newScript = document.createElement('script')

    newScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    newScript.async = true

    document.body.appendChild(newScript)
  }, [routerPathname])

  useEffect(() => {
    if (window && !window.ethicalads) {
      return
    }

    window.ethicalads.reload()
  }, [hash])
}
