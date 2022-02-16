import type { NextPage } from 'next'
import Head from 'next/head'

import { useEffect, useState } from 'react'

import Banner from '../components/banner'
import Collection from '../components/collection'

const Saved: NextPage = () => {
  let [collections, setCollections] = useState<Array<string>>([])

  let meta = {
    title: 'Saved Tailwind CSS Components | HyperUI',
    description: 'Your favourite Tailwind CSS components.',
  }

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
        <title>{meta.title}</title>
        <meta
          property="description"
          content={meta.description}
          key="description"
        />
        <meta property="og:title" content={meta.title} key="og:title" />
        <meta
          property="og:description"
          content={meta.description}
          key="og:description"
        />
        <meta
          property="twitter:title"
          content={meta.title}
          key="twitter:title"
        />
        <meta
          property="twitter:description"
          content={meta.description}
          key="twitter:description"
        />
      </Head>

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
