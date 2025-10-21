import Link from 'next/link'

export default function CollectionCard({ componentData }) {
  const componentCountPluralize = componentData.count > 1 ? 'Components' : 'Component'
  const componentCount = `${componentData.count} ${componentCountPluralize}`

  const hasTag = !!componentData.tag

  return (
    <Link
      href={`/components/${componentData.category}/${componentData.slug}`}
      className="relative block h-full rounded-lg border border-stone-300 bg-white p-4 shadow-sm transition-colors hover:border-indigo-500 hover:ring hover:ring-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none sm:p-6"
    >
      {hasTag && <CardTag tagType={componentData.tag} />}

      <span aria-hidden="true" className="text-lg sm:text-xl">
        {componentData.emoji}
      </span>

      <p className="mt-4 block text-sm text-stone-700">{componentCount}</p>

      <h2 className="mt-1 font-medium text-pretty text-stone-900 sm:text-lg">
        {componentData.title}
      </h2>
    </Link>
  )
}

function CardTag({ tagType }) {
  const isNew = tagType === 'new'
  const isUpdated = tagType === 'updated'

  if (!isNew && !isUpdated) {
    return null
  }

  return (
    <span
      className={`absolute top-2.5 right-2.5 rounded-full border border-current px-2.5 py-0.5 text-xs font-medium whitespace-nowrap capitalize ${
        isNew && 'bg-green-100 text-green-700'
      } ${isUpdated && 'bg-blue-100 text-blue-700'}`}
    >
      {tagType}
    </span>
  )
}
