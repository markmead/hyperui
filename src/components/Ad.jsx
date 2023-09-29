'use client'

import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'

export default function Ad({ adType = 'image', adClass, adId }) {
  const routerPathname = usePathname()

  const [adPath, setAdPath] = useState('')

  useEffect(() => {
    const formattedPathname = routerPathname
      .replace(/\//g, '-')
      .replace(/^-/, '')
      .replace(/components-/g, '')
      .replace(/blog-/g, '')

    const safePathname = formattedPathname === '' ? 'home' : formattedPathname

    const newAdPath = `${adId}-${safePathname}`

    setAdPath(newAdPath)
  }, [routerPathname])

  return (
    <div className="not-prose mx-auto max-w-lg text-center">
      <div
        data-ea-publisher="hyperuidev"
        data-ea-type={adType}
        className={`${adClass} [&_.ea-callout]:!mb-0 [&_.ea-content]:!mx-0 [&_.ea-content]:!mt-0`}
        id={adPath}
      ></div>
    </div>
  )
}
