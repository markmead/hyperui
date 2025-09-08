'use client'

import { useState, useEffect } from 'react'

import Tooltip from '@component/global/Tooltip'

export default function MarketingToggle() {
  const [hideMarketing, setHideMarketing] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const localValue = localStorage.getItem('marketing:hide')

    setHideMarketing(localValue === null ? false : localValue === 'true')
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    document.documentElement.setAttribute('data-stripped', hideMarketing)
  }, [hideMarketing])

  function handleChange() {
    setHideMarketing(!hideMarketing)

    localStorage.setItem('marketing:hide', `${!hideMarketing}`)
  }

  if (!isLoaded) {
    return <></>
  }

  return (
    <Tooltip tooltipContent="Use a stripped design and hide marketing content" tooltipSide="left">
      <label className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white p-4 text-stone-700 shadow-sm">
        <input
          type="checkbox"
          checked={hideMarketing}
          onChange={handleChange}
          className="size-5 rounded border-gray-300 text-indigo-500 shadow-sm"
        />

        <span className="font-medium">Stripped design</span>
      </label>
    </Tooltip>
  )
}
