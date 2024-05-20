import { useState } from 'react'

export default function ProductCard({ product }) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const productDetails = [
    {
      title: 'File Size',
      value: `${product.file_info['Size']} 🐳`,
    },
    {
      title: 'Pages',
      value: `${product.file_info['Length']} 📖`,
    },
    {
      title: 'Future Updates',
      value: 'Included ✅',
    },
  ]

  return (
    <li>
      <div className="flex h-full flex-col overflow-hidden rounded-md border-2 border-gray-900">
        <img src={product.preview_url} alt={product.name} className="aspect-video object-contain" />

        <div className="flex flex-1 flex-col border-t-2 border-gray-900 p-4">
          <h2 className="text-pretty text-xl font-medium text-gray-900 sm:text-2xl">
            {product.name}
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <strong className="font-medium text-gray-700">{product.formatted_price}</strong>

            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700">
              {product.sales_count} Copies Sold
            </span>
          </div>

          <div className="mt-4 flex-1 space-y-4">
            <div>
              <div
                className={`prose max-w-none ${showFullDescription ? '' : 'line-clamp-4'}`}
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div>

              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-sm underline underline-offset-2 hover:no-underline"
              >
                {showFullDescription ? 'Less' : 'More'}...
              </button>
            </div>

            <dl className="divide-y divide-gray-100 rounded-md border border-gray-100 bg-gray-50">
              {productDetails.map(({ title, value }, detailIndex) => (
                <div key={detailIndex} className="grid grid-cols-3 gap-4 px-4 py-2 text-sm">
                  <dt className="font-medium text-gray-700">{title}</dt>
                  <dd className="col-span-2 font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={product.short_url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-md border-2 border-gray-900 bg-gray-900 px-5 py-3 font-medium text-white transition-colors hover:bg-white hover:text-gray-900"
          >
            Buy Now
            <span role="img" aria-hidden="true">
              🔥
            </span>
          </a>
        </div>
      </div>
    </li>
  )
}
