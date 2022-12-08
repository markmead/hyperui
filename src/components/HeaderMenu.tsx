import { MenuLink } from '@/interface/global'

import MenuLinks from '@/components/HeaderMenuLinks'

type Props = {
  showMenu: boolean
  handleSetShowMenu: CallableFunction
  menuLinks: Array<MenuLink>
}

function HeaderMenu({ showMenu, handleSetShowMenu, menuLinks }: Props) {
  return (
    <div className="flex items-center lg:hidden">
      <button
        onClick={() => handleSetShowMenu(!showMenu)}
        className="inline-flex items-center gap-1.5"
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

      {showMenu && (
        <MenuLinks
          menuLinks={menuLinks}
          navClass="absolute inset-x-0 p-4 top-[calc(4rem_+_2px)] bg-white border-b-2 border-gray-100"
          ulClass="space-y-4"
        />
      )}
    </div>
  )
}

export default HeaderMenu
