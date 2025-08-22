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

    return () => {
      globalThis.removeEventListener('favourite:removed', fetchFavourites)
    }
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
      <Hero title="Your Favourites" subtitle="Tailwind CSS components">
        Here you can view and manage all of your favourited components. Giving you quick access to
        the ones you love most.
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        {isLoaded && favouriteItems.length === 0 && (
          <p className="text-center text-stone-700">
            You have no favourites yet. Start adding some!
          </p>
        )}

        <CollectionList componentsData={favouriteItems} />
      </div>
    </>
  )
}
