import type { NextPage } from 'next'

import { useEffect, useState } from 'react'

import Banner from '../components/banner'
import Collection from '../components/collection'

const Saved: NextPage = () => {
  let [collections, setCollections] = useState<Array<string>>([])

  function getAndSetCollections() {
    let savedCollections = JSON.parse(
      localStorage.getItem('collections') || '[]'
    ).sort()

    let newCollections = savedCollections.reduce((acc, item) => {
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

    setCollections(newCollections)
  }

  useEffect(() => {
    getAndSetCollections()

    window.addEventListener('save', () => {
      if (window.location.pathname === '/saved') {
        getAndSetCollections()
      }
    })
  }, [])

  return (
    <>
      <Banner
        title="HyperUI Saved"
        subtitle="Your Saved HyperUI Tailwind CSS Component Library"
      />

      {Object.keys(collections).length > 0 ? (
        <div className="divide-y divide-gray-100">
          {(Object.keys(collections) || []).map((item: string) => (
            <Collection key={item} id={item} components={collections[item]} />
          ))}
        </div>
      ) : (
        <div className="max-w-xl pb-8 mx-auto text-center sm:pb-16">
          <p className="text-sm text-gray-500">
            You have not saved any components yet <span role="img">😢</span>
          </p>
        </div>
      )}
    </>
  )
}

export default Saved
