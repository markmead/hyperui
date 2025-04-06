import Link from 'next/link'

export default function CollectionCard({ componentData }) {
  const componentCountPluralize = componentData.count > 1 ? 'Components' : 'Component'
  const componentCount = `${componentData.count} ${componentCountPluralize}`

  const hasTag = !!componentData.tag

  return (
    <Link href={`/components/${componentData.category}/${componentData.slug}`}>
      <div className="h-full rounded-md bg-white p-4 shadow-sm ring ring-gray-300 transition-shadow hover:ring-2 hover:ring-pink-400 sm:p-6">
        <div className="flex items-center justify-between">
          <span aria-hidden="true" role="img" className="text-lg sm:text-xl">
            {componentData.emoji}
          </span>

          {hasTag && <CardTag tagType={componentData.tag} />}
        </div>

        <p className="mt-4 block text-sm text-gray-700">{componentCount}</p>

        <strong className="mt-1 block font-medium text-gray-900 sm:text-lg">
          {componentData.title}
        </strong>
      </div>
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
