import Link from 'next/link'

export default function CollectionCard({ componentData }) {
  const componentCountPluralize = componentData.count > 1 ? 'Components' : 'Component'
  const componentCount = `${componentData.count} ${componentCountPluralize}`

  const hasTag = !!componentData.tag

  return (
    <Link href={`/components/${componentData.category}/${componentData.slug}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <span aria-hidden="true" role="img" className="text-lg sm:text-xl">
                {componentData.emoji}
              </span>

              {hasTag && <CardTag tagType={componentData.tag} />}
            </div>

            <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">{componentData.title}</h2>

            <p className="mt-1 text-xs text-gray-700">{componentCount}</p>
          </div>
        </div>
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
      className={`-me-1.5 -mt-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium capitalize sm:-me-3 sm:-mt-3 ${
        isNew && 'bg-green-100 text-green-700'
      } ${isUpdated && 'bg-blue-100 text-blue-700'}`}
    >
      {tagType}
    </span>
  )
}
