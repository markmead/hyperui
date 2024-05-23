import Link from 'next/link'

export default function HeaderMenuLinks({ menuLinks, navClass = '', ulClass = '' }) {
  return (
    <nav className={navClass}>
      <ul className={ulClass}>
        {menuLinks.map(({ href, title, highlight = false }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:opacity-75"
              >
                {title}

                {highlight && (
                  <span className="rounded bg-yellow-300 px-1.5 py-1 text-xs/none font-medium text-gray-900">
                    New
                  </span>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
