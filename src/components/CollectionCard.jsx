import Link from 'next/link'

export default function CollectionCard({ componentData }) {
  const componentCountPluralize = componentData.count > 1 ? 'Components' : 'Component'
  const componentCount = `${componentData.count} ${componentCountPluralize}`

  const hasTag = !!componentData.tag

  return (
    <Link
      href={`/components/${componentData.category}/${componentData.slug}`}
      className="block h-full rounded-md border border-gray-300 bg-white p-4 transition-colors hover:border-pink-500 hover:ring hover:ring-pink-500 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none sm:p-6"
    >
      <div className="flex items-center justify-between">
        <span aria-hidden="true" className="text-lg sm:text-xl">
          {componentData.emoji}
        </span>

        {hasTag && <CardTag tagType={componentData.tag} />}
      </div>

      <p className="mt-4 block text-sm text-gray-700">{componentCount}</p>

      <h2 className="mt-1 font-medium text-pretty text-gray-900 sm:text-lg">
        {componentData.title}
      </h2>
    </Link>
  )
}

function CardTag({ tagType }) {
  const isNew = tagType === 'new'
  const isUpdated = tagType === 'updated'

  if (!isNew && !isUpdated) {
    return <></>
  }

  return (
    <span
      className={`-me-1.5 -mt-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap capitalize sm:-me-3 sm:-mt-3 ${
        isNew && 'bg-green-100 text-green-700'
      } ${isUpdated && 'bg-blue-100 text-blue-700'}`}
    >
      {tagType}
    </span>
  )
}
