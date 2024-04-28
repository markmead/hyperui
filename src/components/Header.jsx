'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import BrandLogo from '@component/BrandLogo'
import Container from '@component/Container'
import GithubSocial from '@component/GithubSocial'
import HeaderMenu from '@component/HeaderMenu'
import HeaderMenuLinks from '@component/HeaderMenuLinks'
import HeaderSearch from '@component/HeaderSearch'

export default function Header() {
  const routerPathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => setShowMenu(false), [routerPathname])

  const menuLinks = [
    {
      title: 'Application UI',
      href: '/components/application-ui',
      external: false,
    },
    {
      title: 'Marketing',
      href: '/components/marketing',
      external: false,
    },
    {
      title: 'Blog',
      href: '/blog',
      external: false,
    },
    {
      title: 'AI',
      href: '/ai',
      external: false,
    },
    {
      title: 'HyperJS',
      href: 'https://js.hyperui.dev',
      external: true,
    },
  ]

  return (
    <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-white">
      <Container classNames="relative flex h-16 items-center justify-between gap-4 sm:gap-8">
        <div className="flex flex-1 items-center gap-4">
          <BrandLogo />

          <HeaderMenuLinks
            menuLinks={menuLinks}
            navClass="hidden lg:block lg:flex-1"
            ulClass="gap-4 flex"
          />
        </div>

        <div className="flex items-center justify-end gap-2 sm:gap-4">
          <CategoryAnnouncement />

          <HeaderSearch />

          <GithubSocial />

          <HeaderMenu showMenu={showMenu} handleSetShowMenu={setShowMenu} menuLinks={menuLinks} />
        </div>
      </Container>
    </header>
  )
}

function CategoryAnnouncement() {
  return (
    <Link
      href="/blog/ecommerce-component-changes"
      className="hidden md:inline-flex md:items-center md:justify-center md:gap-1 md:rounded-full md:bg-purple-100 md:px-2.5 md:py-0.5 md:text-xs md:font-medium md:text-purple-700 md:transition-colors md:hover:bg-purple-200 md:hover:text-purple-800"
    >
      <p className="whitespace-nowrap text-sm">eCommerce Changes</p>

      <span role="img" aria-hidden="true" className="hidden sm:block">
        👉
      </span>
    </Link>
  )
}
