'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'favorite:components'

export default function FavoriteButton({ componentData }) {
  const [favoriteComponents, setFavoriteComponents] = useState([])
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const componentKey = componentData?.key

  useEffect(() => {
    try {
      const localFavorites = globalThis.localStorage.getItem(STORAGE_KEY)
      const formattedFavorites = localFavorites ? JSON.parse(localFavorites) : []

      const favoriteKeys = formattedFavorites.map(({ key }) => key)

      setIsFavorited(favoriteKeys.includes(componentKey))
      setFavoriteComponents(formattedFavorites)
    } catch {
      // We do nothing
    } finally {
      setIsLoaded(true)
    }
  }, [])

  function toggleFavorite() {
    const localFavorites = globalThis.localStorage.getItem(STORAGE_KEY)
    const formattedFavorites = localFavorites ? JSON.parse(localFavorites) : []

    if (isFavorited) {
      const filteredFavorites = formattedFavorites.filter(({ key }) => key !== componentKey)

      globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredFavorites))

      setIsFavorited(false)
      setFavoriteComponents(filteredFavorites)

      const favoriteEvent = new CustomEvent('favorite:removed')

      globalThis.dispatchEvent(favoriteEvent)

      return
    }

    const updatedFavorites = [componentData, ...formattedFavorites]

    globalThis.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites))

    setIsFavorited(true)
    setFavoriteComponents(updatedFavorites)
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-pressed={isFavorited}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      className={`grid size-8 place-content-center rounded-lg border text-sm shadow-sm transition-colors ${
        isLoaded && isFavorited
          ? 'border-yellow-300 bg-yellow-100'
          : 'border-stone-300 hover:bg-stone-100'
      }`}
    >
      <span aria-hidden="true">⭐️</span>
    </button>
  )
}
