import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Link as iLink } from '../../interface/global'

import IconMenu from '../icon/menu'

type Props = {
  menu: boolean
  handleMenu: CallableFunction
  links: Array<iLink>
}

const Menu: FunctionComponent<Props> = ({ menu, handleMenu, links }) => (
  <div className="flex items-center sm:hidden">
    <button
      className="inline-flex items-center"
      onClick={() => handleMenu(!menu)}
    >
      <IconMenu />

      <span className="ml-1.5 text-xs font-medium">Menu</span>
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

        <li className="pt-2 mt-2 border-t border-gray-100">
          <Link href="https://twwordle.hyperui.dev/">
            <a className="block p-2 text-xs font-medium text-center hover:opacity-75">
              <span aria-hidden="true" className="mr-1.5" role="img">
                🟧
              </span>
              Tailwind CSS Wordle
              <span aria-hidden="true" className="ml-1.5" role="img">
                🟩
              </span>
            </a>
          </Link>
        </li>
      </ul>
    )}
  </div>
)

export default Menu
