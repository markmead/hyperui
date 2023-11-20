import IconMenu from '@component/IconMenu'
import MenuLinks from '@component/HeaderMenuLinks'

export default function HeaderMenu({ showMenu, handleSetShowMenu, menuLinks }) {
  return (
    <div className="flex items-center lg:hidden">
      <button onClick={() => handleSetShowMenu(!showMenu)} className="text-gray-900">
        <IconMenu />

        <span className="sr-only">Toggle menu</span>
      </button>

      {showMenu && (
        <div className="absolute inset-x-0 top-14 px-2">
          <MenuLinks
            menuLinks={menuLinks}
            navClass="bg-white border p-4 border-gray-200 shadow-lg rounded-lg"
            ulClass="space-y-4"
          />
        </div>
      )}
    </div>
  )
}
