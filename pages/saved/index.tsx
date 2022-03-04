import type { NextPage } from 'next'
import Head from 'next/head'

import { useEffect, useState } from 'react'

import Banner from '../../components/content/banner'
import Collection from '../../components/collection/saved'

const Saved: NextPage = () => {
  let [collections, setCollections] = useState<Array<string>>([])

  function getAndSetCollections() {
    let savedCollections = JSON.parse(
      localStorage.getItem('collections') || '[]'
    ).sort()

    let newCollections = savedCollections.reduce(
      (acc: Array<object>, item: string) => {
        let itemAsArray: Array<string> = item.split('-')
        let id: number = parseInt(itemAsArray[itemAsArray.length - 1])

        itemAsArray.pop()

        let name: string = itemAsArray.join('-')

        if (!acc[name]) {
          acc[name] = []
        }

        acc[name].push(id)

        return acc
      },
      {}
    )

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
      <Head>
        <title>
          Favourite | Free Open Source Tailwind CSS Components | HyperUI
        </title>

        <meta
          content="Find all of your favourite free Tailwind CSS components in one place. Created by HyperUI."
          key="description"
          name="description"
        />
      </Head>

      <Banner
        subtitle="Your Saved HyperUI Tailwind CSS Component Library"
        title="HyperUI Saved"
      />

      {Object.keys(collections).length > 0 ? (
        <div className="divide-y divide-gray-100">
          {(Object.keys(collections) || []).map((item: string) => (
            <Collection components={collections[item]} id={item} key={item} />
          ))}
        </div>
      ) : (
        <div className="max-w-xl pb-8 mx-auto text-center sm:pb-16">
          <p className="text-sm text-gray-500">
            You have not saved any components yet{' '}
            <span aria-hidden="true" role="img">
              😢
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default Saved
