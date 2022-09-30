import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Link as LinkInterface } from '../interface/global'

import IconMenu from './IconMenu'

type Props = {
  menu: boolean
  handleMenu: CallableFunction
  links: Array<LinkInterface>
}

const Menu: FunctionComponent<Props> = ({ menu, handleMenu, links }) => (
  <>
    <div className="flex items-center sm:hidden">
      <button
        className="inline-flex items-center gap-1.5"
        onClick={() => handleMenu(!menu)}
      >
        <IconMenu />

        <span className="text-xs font-medium">Menu</span>
      </button>

      {menu && (
        <ul className="absolute inset-x-0 p-2 mt-[2px] bg-white border-b-2 border-gray-100 top-full">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a className="block p-2 text-xs font-medium">{link.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  </>
)

export default Menu
