import Link from 'next/link'

type Props = {
  fontSize: string
}

function BrandLogo({ fontSize }: Props) {
  return (
    <Link href="/">
      <a className={`${fontSize} text-sm font-medium inline-flex gap-1.5`}>
        <span>HyperUI</span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </a>
    </Link>
  )
}

export default BrandLogo
