'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Ads() {
  const routerPathname = usePathname()

  useEffect(() => {
    const newScript = document.createElement('script')

    newScript.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js'
    newScript.async = true

    document.body.appendChild(newScript)
  }, [routerPathname])
}
