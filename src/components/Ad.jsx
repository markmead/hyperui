'use client'

import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'

export default function Ad({ adType, adClass, adId }) {
  const routerPathname = usePathname()

  const [adPath, setAdPath] = useState('')

  useEffect(() => {
    if (routerPathname === '/') {
      setAdPath('home')

      return
    }

    const formattedPathname = routerPathname
      .replace(/\//g, '-')
      .replace(/^-/, '')
      .replace(/components-/g, '')
      .replace(/blog-/g, '')
      .replace(/about-/g, '')

    const newAdPath = `${adId}-${formattedPathname}`

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
