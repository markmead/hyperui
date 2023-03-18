import Link from 'next/link'

type Props = {
  fontSize: string
}

function BrandLogo({ fontSize }: Props) {
  return (
    <Link href="/">
      <a
        className={`${
          fontSize || 'text-sm'
        } inline-flex gap-1.5  font-medium text-gray-900 dark:text-white`}
      >
        <span>HyperUI</span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </a>
    </Link>
  )
}

export default BrandLogo
