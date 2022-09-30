import Link from 'next/link'

import { ComponentCard } from '../interface/component'
import { transformComponentSlug } from '../utils/componentHelpers'

type Props = {
  componentData: ComponentCard
}

function ComponentCard({ componentData }: Props) {
  const trueComponentSlug = transformComponentSlug(
    componentData.slug,
    componentData.category
  )
  const componentCount = `${componentData.count} ${
    componentData.count > 1 ? 'Components' : 'Component'
  }`

  return (
    <Link href={`/components/${componentData.category}/${trueComponentSlug}`}>
      <a className="relative block group">
        <span
          className="absolute inset-0 border-2 border-black border-dashed rounded-lg"
          aria-hidden="true"
        ></span>

        <div className="transition bg-white border-2 border-black rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-6">
            <span className="text-xl" role="img" aria-hidden="true">
              {componentData.emoji}
            </span>

            <p className="mt-4 text-lg font-medium">{componentData.title}</p>

            <p className="mt-1 text-xs">{componentCount}</p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ComponentCard
