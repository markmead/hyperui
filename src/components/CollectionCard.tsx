import Link from 'next/link'

import { iCollectionItem } from '@type/component'

interface iCollectionData
  extends Omit<iCollectionItem, 'container' | 'wrapper' | 'seo' | 'components'> {
  count: number
  slug: string
}

interface iProps {
  componentData: iCollectionData
}

export default function CollectionCard({ componentData }: iProps) {
  const componentCountPluralize: string = componentData.count > 1 ? 'Components' : 'Component'
  const componentCount: string = `${componentData.count} ${componentCountPluralize}`

  const hasTag: boolean = !!componentData.tag

  return (
    <Link href={`/components/${componentData.category}/${componentData.slug}`}>
      <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-md before:border-2 before:border-dashed before:border-gray-900">
        <div className="h-full rounded-md border-2 border-gray-900 bg-white transition group-hover:-translate-y-2 group-hover:ltr:-translate-x-2 group-hover:rtl:translate-x-2">
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <span aria-hidden="true" role="img" className="text-lg sm:text-xl">
                {componentData.emoji}
              </span>

              {hasTag && <CardTag tagType={componentData.tag} />}
            </div>

            <strong className="mt-4 block font-medium text-gray-900 sm:text-lg">
              {componentData.title}
            </strong>

            <p className="mt-1 text-sm text-gray-700">{componentCount}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

interface iTagClasses {
  [key: string]: string
}

interface iTagProps {
  tagType: string
}

function CardTag({ tagType }: iTagProps) {
  const tagClasses: iTagClasses = {
    new: 'bg-green-100 text-green-700',
    update: 'bg-blue-100 text-blue-700',
  }

  const tagClass: string = tagClasses[tagType]

  if (!tagClass) {
    return <></>
  }

  return (
    <span
      className={`-me-1.5 -mt-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap capitalize sm:-me-3 sm:-mt-3 ${tagClass}`}
    >
      {tagType}
    </span>
  )
}
