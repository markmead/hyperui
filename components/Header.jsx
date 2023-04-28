'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { useLocalStorage } from 'react-use'

import Container from '@component/Container'
import BrandLogo from '@component/BrandLogo'
import HeaderMenu from '@component/HeaderMenu'
import HeaderMenuLinks from '@component/HeaderMenuLinks'
import HeaderSearch from '@component/HeaderSearch'
import IconGithub from '@component/IconGithub'
import IconSun from '@component/IconSun'
import IconMoon from '@component/IconMoon'

function Header() {
  const routerPathname = usePathname()

  const [showMenu, setShowMenu] = useState(false)
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  useEffect(() => setShowMenu(false), [routerPathname])

  useEffect(() => {
    const appBody = document.getElementById('AppBody')

    appBody.classList.toggle('dark', darkMode)
  }, [darkMode])

  const menuLinks = [
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

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="inline-block text-gray-900 hover:opacity-75 dark:text-white"
          >
            {darkMode ? <IconSun /> : <IconMoon />}

            <span className="sr-only">Toggle theme</span>
          </button>
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
      className="inline-block text-gray-900 hover:opacity-75 dark:text-white"
    >
      <span className="sr-only"> GitHub </span>

      <IconGithub />
    </a>
  )
}

export default Header
