import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { ComponentCard } from '../../interface/component'

type Props = {
  item: ComponentCard
}

const Card: FunctionComponent<Props> = ({ item }) => {
  const { title, slug, count } = item

  return (
    <Link href={`/components/${slug}`}>
      <a>
        {title}
        {count} {count > 1 ? ' components' : ' component'}
      </a>
    </Link>
  )
}

export default Card
