'use client'

import { useEffect, useState } from 'react'

import ProductCard from '@component/ProductCard'

export default function ProductGrid() {
  const [isLoading, setIsLoading] = useState(true)
  const [productList, setProductList] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const gumroadProducts = await fetch('/api/products')
    const gumroadJson = await gumroadProducts.json()

    setProductList(gumroadJson)

    setIsLoading(false)
  }

  if (isLoading) {
    return <p className="text-center text-gray-700">Loading products...</p>
  }

  return (
    <>
      {productList.length ? (
        <ul className="grid auto-rows-fr gap-4 md:grid-cols-2">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-700">No products found. Please check back later.</p>
      )}
    </>
  )
}
