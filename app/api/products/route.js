import { NextResponse } from 'next/server'

const accessToken = process.env.GUMROAD_ACCESS_TOKEN

export async function GET() {
  try {
    if (!accessToken) {
      throw new Error('Missing Access Token for Gumroad API 🚨')
    }

    const gumroadResponse = await fetch(
      `https://api.gumroad.com/v2/products?access_token=${accessToken}`
    )

    const { products: allProducts } = await gumroadResponse.json()
    const filteredProducts = allProducts.filter(({ published }) => published)

    return NextResponse.json(filteredProducts)
  } catch {
    return NextResponse.json([])
  }
}
