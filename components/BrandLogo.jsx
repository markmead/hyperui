import Link from 'next/link'

function BrandLogo({ fontSize }) {
  return (
    <Link href="/">
      <div
        className={`${
          fontSize || 'text-sm'
        } inline-flex gap-1.5  font-medium text-gray-900 dark:text-white`}
      >
        <span>HyperUI</span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </div>
    </Link>
  )
}

export default BrandLogo
