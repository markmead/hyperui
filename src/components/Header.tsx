import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { menuLinks } from '@/utils/menuLinks'

import GitHub from '@/components/BrandGithub'
import Twitter from '@/components/BrandTwitter'
import Logo from '@/components/BrandLogo'
import Menu from '@/components/HeaderMenu'
import MenuLinks from '@/components/HeaderMenuLinks'
import Search from '@/components/HeaderSearch'
import Settings from '@/components/HeaderSettings'

function Header() {
  const nextRouter = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => setShowMenu(false), [nextRouter.asPath])

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b-2 border-gray-100 bg-white">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="relative flex h-16 items-center justify-between gap-8">
          <div className="flex flex-1 items-center gap-4">
            <Logo fontSize="text-sm" />

            <span
              aria-hidden="true"
              className="hidden md:block md:h-6 md:w-px md:bg-gray-100"
            ></span>

            <MenuLinks
              menuLinks={menuLinks}
              navClass="hidden lg:block lg:flex-1"
              ulClass="gap-4 flex"
            />
          </div>

          <div className="flex items-center justify-end gap-4">
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

            <span
              aria-hidden="true"
              className="hidden md:block md:h-6 md:w-px md:bg-gray-100"
            ></span>

            <div className="hidden md:block">
              <Settings />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
