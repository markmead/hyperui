'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import CollectionList from '@component/CollectionList'

const STORAGE_KEY = 'favouriteComponents'

export default function FavouritesList() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [favouriteItems, setFavoriteItems] = useState([])

  const fetchFavourites = useCallback(() => {
    try {
      const localFavourites = globalThis.localStorage.getItem(STORAGE_KEY)
      const formattedFavourites = localFavourites ? JSON.parse(localFavourites) : []

      setFavoriteItems(formattedFavourites)
    } catch {
      setFavoriteItems([])
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    fetchFavourites()

    globalThis.addEventListener('favourite:removed', fetchFavourites)

    return () => {
      globalThis.removeEventListener('favourite:removed', fetchFavourites)
    }
  }, [fetchFavourites])

  const itemListSchema = useMemo(() => {
    if (!isLoaded) return null

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Your Favourite Tailwind CSS Components',
      description:
        'List of Tailwind CSS components you marked as favourite on HyperUI (stored locally in your browser).',
      url: 'https://www.hyperui.dev/favourites',
      numberOfItems: favouriteItems.length,
      itemListElement: favouriteItems.map((componentItem, componentIndex) => ({
        '@type': 'ListItem',
        position: componentIndex + 1,
        name: componentItem.title,
        url: `https://www.hyperui.dev/components/${componentItem.category}/${componentItem.slug}#component-${componentItem.id}`,
      })),
    }
  }, [isLoaded, favouriteItems])

  return (
    <>
      {itemListSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}

      {isLoaded && favouriteItems.length === 0 && (
        <p className="text-center text-stone-700">You have no favourites yet. Start adding some!</p>
      )}

      <CollectionList componentsData={favouriteItems} />
    </>
  )
}
