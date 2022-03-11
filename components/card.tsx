import type { FunctionComponent } from 'react'

import Link from 'next/link'

type Props = {
  title: string
  slug: string
}

const Card: FunctionComponent<Props> = ({ title, slug }) => {
  return (
    <Link href={`/examples/${slug}`}>
      <a className="p-6 border-2 border-black hover:bg-black rounded-xl hover:text-white">
        <p className="mt-4 text-lg font-medium">{title}</p>
      </a>
    </Link>
  )
}

export default Card
