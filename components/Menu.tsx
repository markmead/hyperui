import type { FunctionComponent } from 'react'

import Link from 'next/link'

import { Link as LinkInterface } from '../interface/global'

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

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
