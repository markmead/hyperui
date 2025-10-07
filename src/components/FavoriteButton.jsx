'use client'

import { useEffect, useState } from 'react'

import Tooltip from '@component/global/Tooltip'

const STORAGE_KEY = 'favouriteComponents'

export default function FavoriteButton({ componentData }) {
  const [favouriteComponents, setFavoriteComponents] = useState([])
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const componentKey = componentData?.key

  const descriptiveContent = isFavorited ? 'Remove from favourites' : 'Add to favourites'

  useEffect(() => {
    try {
      const localFavourites = globalThis.localStorage.getItem(STORAGE_KEY)
      const formattedFavourites = localFavourites ? JSON.parse(localFavourites) : []

      const favouriteKeys = formattedFavourites.map(({ key }) => key)

      setIsFavorited(favouriteKeys.includes(componentKey))
      setFavoriteComponents(formattedFavourites)
    } catch {
      // We do nothing
    } finally {
      setIsLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggleFavorite() {
    const localFavourites = globalThis.localStorage.getItem(STORAGE_KEY)
    const formattedFavourites = localFavourites ? JSON.parse(localFavourites) : []

    if (isFavorited) {
      const filteredFavourites = formattedFavourites.filter(({ key }) => key !== componentKey)

      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredFavourites))

      setIsFavorited(false)
      setFavoriteComponents(filteredFavourites)

      const favouriteEvent = new CustomEvent('favourite:removed')

      globalThis.dispatchEvent(favouriteEvent)

      return
    }

    const updatedFavourites = [componentData, ...formattedFavourites]

    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavourites))

    setIsFavorited(true)
    setFavoriteComponents(updatedFavourites)
  }

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
