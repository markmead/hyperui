import type { NextPage } from 'next'

import { useEffect, useState } from 'react'

import Banner from '../components/banner'
import Collection from '../components/collection'

const Saved: NextPage = () => {
  let [collections, setCollections] = useState<Array<string>>([])

  useEffect(() => {
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

    getAndSetCollections()

    window.addEventListener('save', () => getAndSetCollections())
  }, [])

  return (
    <>
      <Banner
        title="HyperUI Saved"
        subtitle="Your Saved HyperUI Tailwind CSS Component Library"
      />

      <div className="flow-root">
        <div className="-my-8 divide-y divide-gray-100 sm:-my-16">
          {(Object.keys(collections) || []).map((item: string) => (
            <Collection key={item} id={item} components={collections[item]} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Saved
