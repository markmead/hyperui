import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { menuLinks } from '../utils/menuLinks'

import GitHub from './BrandGithub'
import Logo from './BrandLogo'
import Menu from './HeaderMenu'
import MenuLinks from './HeaderMenuLinks'
import Search from './HeaderSearch'
import Twitter from './BrandTwitter'

function Header() {
  const nextRouter = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => setShowMenu(false), [nextRouter.asPath])

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white border-b-2 border-gray-100">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Logo fontSize="text-sm" />

            <span
              aria-hidden="true"
              className="hidden sm:w-px sm:h-6 sm:bg-gray-100 sm:block"
            ></span>

            <MenuLinks
              menuLinks={menuLinks}
              navClass="hidden sm:block"
              ulClass="gap-4 flex"
            />
          </div>

          <div className="flex items-center justify-end flex-1 gap-4">
            <Search />

            <div className="flex gap-4">
              <Twitter />

              <GitHub />
            </div>

            <Menu
              showMenu={showMenu}
              handleSetShowMenu={setShowMenu}
              menuLinks={menuLinks}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header