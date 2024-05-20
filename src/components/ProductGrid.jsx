'use client'

import { useEffect, useState } from 'react'

import ProductCard from '@component/ProductCard'

export default function ProductGrid() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const gumroadProducts = await fetch('/api/products')
    const gumroadJson = await gumroadProducts.json()

    setProductList(gumroadJson)
  }

  if (!productList.length) {
    return <p className="text-center text-gray-700">No products found. Please check back later.</p>
  }

  return (
    <ul className="grid auto-rows-fr gap-4 md:grid-cols-2">
      {productList.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  )
}
