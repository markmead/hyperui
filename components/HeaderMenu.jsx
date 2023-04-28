import IconMenu from '@component/IconMenu'
import MenuLinks from '@component/HeaderMenuLinks'

export default function HeaderMenu({ showMenu, handleSetShowMenu, menuLinks }) {
  return (
    <div className="flex items-center lg:hidden">
      <button
        onClick={() => handleSetShowMenu(!showMenu)}
        className="text-gray-900 dark:text-white"
      >
        <IconMenu />

        <span className="sr-only">Toggle menu</span>
      </button>

      {showMenu && (
        <MenuLinks
          menuLinks={menuLinks}
          navClass="absolute inset-x-0 p-4 top-14 bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-lg rounded-lg"
          ulClass="space-y-4"
        />
      )}
    </div>
  )
}
