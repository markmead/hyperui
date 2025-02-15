import Link from 'next/link'

import { iCollectionItem } from '@type/component'

import CardTag from '@component/CardTag'

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

  const componentTag: string = componentData?.tag || ''
  const componentHasTag: boolean = !!componentData.tag

  return (
    <Link href={`/components/${componentData.category}/${componentData.slug}`}>
      <div className="p-4l flex h-full flex-col rounded-md border-2 border-gray-900 transition-transform hover:scale-105 sm:p-6">
        {componentHasTag && <CardTag tagType={componentTag} tagText={componentTag} />}

        <div className="mt-auto">
          <span aria-hidden="true" role="img" className="text-lg sm:text-xl">
            {componentData.emoji}
          </span>

          <p className="mt-4 block text-sm text-gray-700">{componentCount}</p>

          <strong className="mt-1 block font-medium text-gray-900 sm:text-lg">
            {componentData.title}
          </strong>
        </div>
      </div>
    </Link>
  )
}
