import Link from 'next/link'

export default function CollectionCard({ componentData }) {
  const componentCountPluralize =
    componentData.count > 1 ? 'Components' : 'Component'
  const componentCount = `${componentData.count} ${componentCountPluralize}`
  const isNew = componentData.slug.includes('new')

  return (
    <Link href={`/components/${componentData.category}/${componentData.slug}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        {isNew && (
          <span className="absolute -end-1.5 -top-1.5 z-10 block -skew-x-6 rounded-md border-2 border-gray-900 bg-yellow-400 px-2 py-1.5 text-xs/none font-medium uppercase tracking-wide text-gray-900 transition group-hover:-translate-y-2 ltr:group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
            New
          </span>
        )}

        <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
          <div className="p-4 sm:p-6">
            <span aria-hidden="true" role="img" className="text-lg sm:text-xl">
              {componentData.emoji}
            </span>

            <h2 className="mt-4 font-medium text-gray-900 sm:text-lg">
              {componentData.title}
            </h2>

            <p className="mt-1 text-xs text-gray-700">{componentCount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
