import MenuLinks from '@component/HeaderMenuLinks'

import { iPageLink } from '@type/site'

interface iProps {
  showMenu: boolean
  menuLinks: iPageLink[]
  handleSetShowMenu: (showMenu: boolean) => void
}

export default function HeaderMenu({ showMenu, menuLinks, handleSetShowMenu }: iProps) {
  return (
    <div className="flex items-center md:hidden">
      <button className="text-gray-900" onClick={() => handleSetShowMenu(!showMenu)}>
        <IconMenu />

        <span className="sr-only">Toggle menu</span>
      </button>

      {showMenu && (
        <div className="absolute inset-x-0 top-14 px-2">
          <MenuLinks
            menuLinks={menuLinks}
            navClass="bg-white border p-4 border-gray-200 shadow-lg rounded-md"
            ulClass="space-y-4"
          />
        </div>
      )}
    </div>
  )
}

function IconMenu() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
