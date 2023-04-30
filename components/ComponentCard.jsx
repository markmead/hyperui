import Link from 'next/link'

import { componentSlug } from '@/services/utils/transformers'

export default function ComponentCard({ componentData }) {
  const trueComponentSlug = componentSlug(
    componentData.slug,
    componentData.category
  )

  const componentCountPluralize =
    componentData.count > 1 ? 'Components' : 'Component'

  const componentCount = `${componentData.count} ${componentCountPluralize}`

  return (
    <Link href={`/components/${componentData.category}/${trueComponentSlug}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
        <div className="rounded-lg border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 ltr:group-hover:-translate-x-2 rtl:group-hover:translate-x-2">
          <div className="p-6">
            <span aria-hidden="true" role="img" className="text-xl">
              {componentData.emoji}
            </span>

            <h2 className="mt-4 text-lg font-medium text-gray-900">
              {componentData.title}
            </h2>

            <p className="mt-1 text-xs text-gray-700">{componentCount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
