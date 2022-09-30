import Link from 'next/link'

function BrandLogo() {
  return (
    <Link href="/">
      <a className="text-sm font-medium inline-flex gap-1.5">
        <span>HyperUI</span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </a>
    </Link>
  )
}

export default BrandLogo
