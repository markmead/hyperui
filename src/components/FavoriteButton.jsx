'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import Tooltip from '@component/global/Tooltip'

const STORAGE_KEY = 'favouriteComponents'

export default function FavoriteButton({ componentData }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const componentKey = componentData?.key

  const descriptiveContent = useMemo(
    () => (isFavorited ? 'Remove from favourites' : 'Add to favourites'),
    [isFavorited]
  )

  useEffect(() => {
    if (!componentKey) return

    try {
      const localFavourites = globalThis.localStorage.getItem(STORAGE_KEY)
      const formattedFavourites = localFavourites ? JSON.parse(localFavourites) : []

      const isFavourited = formattedFavourites.some(({ key }) => key === componentKey)

      setIsFavorited(isFavourited)
    } catch {
      // We do nothing
    } finally {
      setIsLoaded(true)
    }
  }, [componentKey])

  const toggleFavorite = useCallback(() => {
    if (!componentKey) return

    const localFavourites = globalThis.localStorage.getItem(STORAGE_KEY)
    const formattedFavourites = localFavourites ? JSON.parse(localFavourites) : []

    if (isFavorited) {
      const filteredFavourites = formattedFavourites.filter(({ key }) => key !== componentKey)

      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredFavourites))

      setIsFavorited(false)

      const favouriteEvent = new CustomEvent('favourite:removed')

      globalThis.dispatchEvent(favouriteEvent)

      return
    }

    const updatedFavourites = [componentData, ...formattedFavourites]

    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavourites))

    setIsFavorited(true)
  }, [componentKey, componentData, isFavorited])

  return (
    <Tooltip tooltipContent={descriptiveContent}>
      <button
        type="button"
        onClick={toggleFavorite}
        aria-pressed={isFavorited}
        aria-label={descriptiveContent}
        className={`hidden size-8 place-content-center rounded-lg border text-sm shadow-sm transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none md:grid ${
          isLoaded && isFavorited
            ? 'border-yellow-300 bg-yellow-100'
            : 'border-stone-300 hover:bg-stone-100'
        }`}
      >
        <span aria-hidden="true">⭐️</span>
      </button>
    </Tooltip>
  )
}
