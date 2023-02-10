import Link from 'next/link'

import { ChangelogCard as ChangelogCardInterface } from '@/interface/changelog'

type Props = {
  changelogPost: ChangelogCardInterface
}

function ChangelogCard({ changelogPost }: Props) {
  return (
    <Link href="/changelog/[slug]" as={`/changelog/${changelogPost.slug}`}>
      <a
        title={`HyperUI Changelog - ${changelogPost.title}`}
        className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-black"
      >
        <div className="h-full rounded-lg border-2 border-black bg-white transition group-hover:-translate-x-2 group-hover:-translate-y-2">
          <div className="p-8">
            <p className="text-xl font-medium">{changelogPost.title}</p>

            <p className="mt-1 text-xs text-gray-500">
              {changelogPost.description}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ChangelogCard
