'use client'

import { useEffect, useState } from 'react'

import FavoriteButton from '@component/FavoriteButton'
import Hero from '@component/global/Hero'
import CollectionList from '@component/CollectionList'

const STORAGE_KEY = 'favorite:components'

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [favoriteItems, setFavoriteItems] = useState([])

  useEffect(() => {
    fetchFavorites()

    globalThis.addEventListener('favorite:removed', fetchFavorites)
  }, [])

  function fetchFavorites() {
    try {
      const localFavorites = globalThis.localStorage.getItem(STORAGE_KEY)
      const formattedFavorites = localFavorites ? JSON.parse(localFavorites) : []

      setFavoriteItems(formattedFavorites)
    } catch {
      setFavoriteItems([])
    } finally {
      setIsLoaded(true)
    }
  }

  return (
    <>
      <Hero title="Your Favorites" subtitle="View your saved Tailwind CSS components">
        This page displays all the components you have favorited. Easily revisit and manage your
        favorite Tailwind CSS v4 components for quick access in your projects.
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        {!isLoaded && <p className="text-stone-700">Loading…</p>}

        {isLoaded && favoriteItems.length === 0 && (
          <p className="text-stone-700">No favorites yet.</p>
        )}

        <CollectionList componentsData={favoriteItems} />
      </div>
    </>
  )
}
