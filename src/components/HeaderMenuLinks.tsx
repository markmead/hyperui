import Link from 'next/link'

import { iPageLink } from '@type/site'

interface iProps {
  menuLinks: iPageLink[]
  navClass?: string
  ulClass?: string
}

export default function HeaderMenuLinks({ menuLinks, navClass = '', ulClass = '' }: iProps) {
  return (
    <nav className={navClass}>
      <ul className={ulClass}>
        {menuLinks.map(({ href, title }) => {
          return (
            <li key={href}>
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-900 hover:opacity-75"
              >
                {title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
