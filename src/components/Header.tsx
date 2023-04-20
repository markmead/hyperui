import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { MenuLink } from '@/interface/global'

import Logo from '@/components/BrandLogo'
import Menu from '@/components/HeaderMenu'
import MenuLinks from '@/components/HeaderMenuLinks'
import Search from '@/components/HeaderSearch'
import Settings from '@/components/HeaderSettings'
import IconGithub from '@/components/IconGithub'

function Header() {
  const { asPath } = useRouter()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => setShowMenu(false), [asPath])

  const menuLinks: Array<MenuLink> = [
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
      title: 'Application UI',
      href: '/components/application-ui',
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
    <header className="sticky inset-x-0 top-0 z-50 border-b-2 border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="relative flex h-16 items-center justify-between gap-8">
          <div className="flex flex-1 items-center gap-4">
            <Logo fontSize="text-sm" />

            <span className="hidden lg:block">
              <Separator />
            </span>

            <MenuLinks
              menuLinks={menuLinks}
              navClass="hidden lg:block lg:flex-1"
              ulClass="gap-4 flex"
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Search />

            <GithubLink />

            <Menu
              showMenu={showMenu}
              handleSetShowMenu={setShowMenu}
              menuLinks={menuLinks}
            />

            <Separator />

            <Settings />
          </div>
        </div>
      </div>
    </header>
  )
}

function GithubLink() {
  return (
    <a
      href="https://github.com/markmead/hyperui"
      rel="noreferrer"
      target="_blank"
      className="inline-block text-gray-900 hover:opacity-75 dark:text-white"
    >
      <span className="sr-only"> GitHub </span>

      <IconGithub />
    </a>
  )
}

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="h-6 w-px bg-gray-100 dark:bg-gray-800"
    ></span>
  )
}

export default Header
