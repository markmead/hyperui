'use client'

import { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import usePreferencesStore from '@store/preferences.store'

import BrandLogo from '@component/BrandLogo'
import Container from '@component/Container'
import GithubSocial from '@component/GithubSocial'
import HeaderMenu from '@component/HeaderMenu'
import HeaderMenuLinks from '@component/HeaderMenuLinks'
import HeaderSearch from '@component/HeaderSearch'

export default function Header() {
  const routerPathname = usePathname()

  const { isSiteDarkMode, setIsSiteDarkMode } = usePreferencesStore()

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => setShowMenu(false), [routerPathname])

  useEffect(() => {
    document.documentElement.classList.toggle('dark')
  }, [isSiteDarkMode])

  const menuLinks = [
    {
      title: 'Application UI',
      href: '/components/application-ui',
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
    <header className="sticky inset-x-0 top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <Container classNames="relative flex h-16 items-center justify-between gap-4 sm:gap-8">
        <div className="flex items-center gap-4">
          <BrandLogo />

          <HeaderMenuLinks menuLinks={menuLinks} navClass="hidden md:block" ulClass="gap-4 flex" />
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <HeaderSearch />

          <GithubSocial />

          <DarkToggle isDarkMode={isSiteDarkMode} handleSetDarkMode={setIsSiteDarkMode} />

          <HeaderMenu showMenu={showMenu} handleSetShowMenu={setShowMenu} menuLinks={menuLinks} />
        </div>
      </Container>
    </header>
  )
}

function DarkToggle({ isDarkMode, handleSetDarkMode }) {
  return (
    <button
      onClick={() => handleSetDarkMode(!isDarkMode)}
      class="rounded p-1 text-gray-900 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
          />
        </svg>
      )}
    </button>
  )
}
