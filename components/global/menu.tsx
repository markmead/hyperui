import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Link as iLink } from '../../interface/global'

type Props = {
  menu: boolean
  handleMenu: CallableFunction
  links: Array<iLink>
}

const Menu: FunctionComponent<Props> = ({ menu, handleMenu, links }) => (
  <div>
    <button onClick={() => handleMenu(!menu)}>Menu</button>

    {menu && (
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <a>{link.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
)

export default Menu
