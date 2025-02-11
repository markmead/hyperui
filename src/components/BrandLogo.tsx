import Link from 'next/link'

interface iProps {
  fontSize?: string
}

export default function BrandLogo({ fontSize = 'text-sm' }: iProps) {
  return (
    <Link href="/">
      <div className={`inline-flex gap-1.5 ${fontSize}`}>
        <span className="font-medium text-gray-900">HyperUI</span>

        <span aria-hidden="true" role="img">
          🚀
        </span>
      </div>
    </Link>
  )
}
