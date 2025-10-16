import Link from 'next/link'

export default function HeaderLinks({ headerLinks }) {
  return (
    <ul className="flex flex-col gap-4 md:flex-row">
      {headerLinks.map(({ href, title }) => {
        return (
          <li key={href}>
            <Link
              href={href}
              className="font-medium text-stone-700 transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
            >
              {title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
