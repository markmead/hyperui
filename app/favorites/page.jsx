'use client'

import { useEffect, useState } from 'react'

import FavoriteButton from '@component/FavoriteButton'
import Hero from '@component/global/Hero'
import CollectionList from '@component/CollectionList'

const STORAGE_KEY = 'favourite:components'

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [favouriteItems, setFavoriteItems] = useState([])

  useEffect(() => {
    fetchFavourites()

    globalThis.addEventListener('favourite:removed', fetchFavourites)
  }, [])

  function fetchFavourites() {
    try {
      const localFavourites = globalThis.localStorage.getItem(STORAGE_KEY)
      const formattedFavourites = localFavourites ? JSON.parse(localFavourites) : []

      setFavoriteItems(formattedFavourites)
    } catch {
      setFavoriteItems([])
    } finally {
      setIsLoaded(true)
    }
  }

  return (
    <>
      <Hero title="Your Favourites" subtitle="View your saved Tailwind CSS components">
        This page displays all the components you have favourited. Easily revisit and manage your
        favourite Tailwind CSS v4 components for quick access in your projects.
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        {!isLoaded && <p className="text-stone-700">Loading…</p>}

        {isLoaded && favouriteItems.length === 0 && (
          <p className="text-stone-700">No favourites yet.</p>
        )}

        <CollectionList componentsData={favouriteItems} />
      </div>
    </>
  )
}
