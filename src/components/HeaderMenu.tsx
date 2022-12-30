import { MenuLink } from '@/interface/global'

import IconMenu from '@/components/IconMenu'
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
        <IconMenu />

        <span className="text-xs font-medium">Menu</span>
      </button>

      {showMenu && (
        <MenuLinks
          menuLinks={menuLinks}
          navClass="absolute inset-x-0 p-4 top-14 bg-white border border-gray-100 shadow-lg rounded-lg"
          ulClass="space-y-4"
        />
      )}
    </div>
  )
}

export default HeaderMenu
