import Link from 'next/link'

export default function BrandLogo({ fontSize }) {
  return (
    <Link href="/">
      <div className="inline-flex gap-1.5">
        <span className={`${fontSize || 'text-sm'} font-medium text-gray-900`}>
          HyperUI
        </span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </div>
    </Link>
  )
}
