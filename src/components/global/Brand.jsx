import Link from 'next/link'

export default function Brand({ isLarge = false }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
    >
      <span className={`font-medium text-stone-900 ${isLarge ? 'text-lg' : 'text-base'}`}>
        HyperUI
      </span>

      <span aria-hidden="true">🚀</span>
    </Link>
  )
}
