import Link from 'next/link'

import { PageLink } from '@type/site'

interface Props {
  menuLinks: PageLink[]
  navClass?: string
  ulClass?: string
}

export default function HeaderMenuLinks({ menuLinks, navClass = '', ulClass = '' }: Props) {
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
