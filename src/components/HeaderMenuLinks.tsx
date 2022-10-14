import Link from 'next/link'

import { MenuLink } from '@/interface/global'

type Props = {
  menuLinks: Array<MenuLink>
  navClass: string
  ulClass: string
}

function HeaderMenuLinks({ menuLinks, navClass, ulClass }: Props) {
  return (
    <nav aria-label="Page Nav" className={navClass}>
      <ul className={ulClass}>
        {menuLinks.map((menuLink) => (
          <li key={menuLink.href}>
            <Link href={menuLink.href}>
              <a className="block text-xs font-medium hover:opacity-75">
                {menuLink.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderMenuLinks
