'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import Brand from '@component/global/Brand'

import Github from '@component/global/Github'
import HeaderMenu from '@component/global/HeaderMenu'
import HeaderLinks from '@component/global/HeaderLinks'
import HeaderSearch from '@component/global/HeaderSearch'

export default function Header() {
  const routerPathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => setShowMenu(false), [routerPathname])

  const headerLinks = [
    { title: 'Application', href: '/components/application', mobile: true },
    { title: 'Marketing', href: '/components/marketing', mobile: true },
    { title: 'Blog', href: '/blog', mobile: true },
    { title: 'Favourites', href: '/favourites', mobile: false },
  ]

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-stone-300 bg-white">
      <div className="relative mx-auto flex h-16 max-w-screen-xl items-center justify-between gap-4 px-4">
        <div className="md:flex md:gap-8">
          <Brand />

          <nav className="hidden md:block">
            <HeaderLinks headerLinks={headerLinks} />
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="hidden sm:block">
            <HeaderSearch />
          </div>

          <HeaderMenu
            showMenu={showMenu}
            headerLinks={headerLinks}
            handleSetShowMenu={setShowMenu}
          />

          <Github />
        </div>
      </div>
    </header>
  )
}
