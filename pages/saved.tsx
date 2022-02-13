import type { NextPage } from 'next'

import { useEffect, useState } from 'react'

import Banner from '../components/banner'
import Collection from '../components/collection'

const Saved: NextPage = () => {
  let [collections, setCollections] = useState<Array<string>>([])

  useEffect(() => {
    let savedCollections = JSON.parse(
      localStorage.getItem('collections') || '[]'
    )

    let groupedSavedCollections = savedCollections.reduce((acc, item) => {
      let itemAsArray = item.split('-')
      let id = parseInt(itemAsArray[itemAsArray.length - 1])

      itemAsArray.pop()

      let name = itemAsArray.join('-')

      if (!acc[name]) {
        acc[name] = []
      }

      acc[name].push(id)

      return acc
    }, {})

    setCollections(groupedSavedCollections)
  }, [])

  return (
    <>
      <Banner
        title="HyperUI Saved"
        subtitle="Your Saved HyperUI Tailwind CSS Component Library"
      />

      {(Object.keys(collections) || []).map((item: string) => (
        <Collection
          key={item}
          collection={item}
          components={collections[item]}
        />
      ))}
    </>
  )
}

export default Saved
