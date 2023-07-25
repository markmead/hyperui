'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import Container from '@component/Container'
import BrandLogo from '@component/BrandLogo'
import HeaderMenu from '@component/HeaderMenu'
import HeaderMenuLinks from '@component/HeaderMenuLinks'
import HeaderSearch from '@component/HeaderSearch'
import IconGithub from '@component/IconGithub'

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
      title: 'eCommerce',
      href: '/components/ecommerce',
      external: false,
    },
    {
      title: 'Blog',
      href: '/blog',
      external: false,
    },
    {
      title: 'FAQs',
      href: '/about/faqs',
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
      <Container classNames="relative flex h-16 items-center justify-between gap-8">
        <div className="flex flex-1 items-center gap-4">
          <BrandLogo fontSize="text-sm" />

          <HeaderMenuLinks
            menuLinks={menuLinks}
            navClass="hidden lg:block lg:flex-1"
            ulClass="gap-4 flex"
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <HeaderSearch />

          <GithubLink />

          <HeaderMenu
            showMenu={showMenu}
            handleSetShowMenu={setShowMenu}
            menuLinks={menuLinks}
          />
        </div>
      </Container>
    </header>
  )
}

function GithubLink() {
  return (
    <a
      href="https://github.com/markmead/hyperui"
      rel="noreferrer"
      target="_blank"
      className="inline-block text-gray-900 hover:opacity-75"
    >
      <span className="sr-only"> GitHub </span>

      <IconGithub />
    </a>
  )
}
