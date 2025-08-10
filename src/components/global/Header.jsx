'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import Brand from '@component/global/Brand'
import Container from '@component/global/Container'
import Github from '@component/global/Github'
import HeaderMenu from '@component/global/HeaderMenu'
import HeaderLinks from '@component/global/HeaderLinks'
import HeaderSearch from '@component/global/HeaderSearch'

export default function Header() {
  const routerPathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => setShowMenu(false), [routerPathname])

  const headerLinks = [
    {
      title: 'Application',
      href: '/components/application',
    },
    {
      title: 'Marketing',
      href: '/components/marketing',
    },
    {
      title: 'Blog',
      href: '/blog',
    },
  ]

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-300 bg-white">
      <Container classNames="relative flex h-16 items-center justify-between gap-4">
        <div className="md:flex md:gap-8">
          <Brand />

          <nav className="hidden md:block">
            <HeaderLinks headerLinks={headerLinks} />
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          <HeaderSearch />

          <HeaderMenu
            showMenu={showMenu}
            headerLinks={headerLinks}
            handleSetShowMenu={setShowMenu}
          />

          <Github />
        </div>
      </Container>
    </header>
  )
}
