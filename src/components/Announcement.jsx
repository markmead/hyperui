'use client'

import { useEffect, useState } from 'react'

import { useSessionStorage } from 'react-use'

export default function Announcement() {
  const [showPopup, setShowPopup] = useSessionStorage('showPopup', true)
  const [promotionProduct, setPromotionProduct] = useState({})

  const hasPromotionProduct = Object.keys(promotionProduct).length

  // We don't need to hit the API, this information is static
  const promotionProducts = [
    {
      description: 'Building a HyperUI Clone with Next JS, Tailwind CSS and MDX',
      price: 5.99,
      url: 'https://markmdev.gumroad.com/l/hyperui-clone/FIRST10',
    },
    {
      description: 'Tips, Tricks and Experiments for Tailwind CSS',
      price: 1.99,
      url: 'https://markmdev.gumroad.com/l/tailwindcss-tips-tricks-experiments',
    },
  ]

  useEffect(() => {
    if (!showPopup) {
      return
    }

    const randomProduct = promotionProducts[Math.floor(Math.random() * promotionProducts.length)]

    setPromotionProduct(randomProduct)
  }, [showPopup])

  if (!showPopup || !hasPromotionProduct) {
    return null
  }

  return (
    <div className="fixed bottom-4 z-50 p-4" role="alert">
      <div className="relative max-w-sm rounded-md border-2 border-gray-900 bg-white p-4 shadow-lg">
        <button
          className="absolute -right-3 -top-3 size-8 rounded border-2 border-gray-900 bg-white text-xs hover:bg-gray-100"
          onClick={() => setShowPopup(!showPopup)}
        >
          ❌
        </button>

        <p className="text-pretty text-center text-lg font-medium text-gray-900">
          {promotionProduct.description}
        </p>

        <a
          href={promotionProduct.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 block flex-1 rounded-md border-2 border-gray-900 bg-gray-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800"
        >
          Get the eBook for ${promotionProduct.price}
        </a>
      </div>
    </div>
  )
}
