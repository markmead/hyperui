import { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/router'

import IconGithub from '../icon/github'
import IconTwitter from '../icon/twitter'
import Search from './search'
import { links } from '../../data/header/links'
import IconMenu from '../icon/menu'

const Header: FunctionComponent = () => {
  let router = useRouter()
  let [menu, setMenu] = useState(false)

  useEffect(() => {
    setMenu(false)
  }, [router.asPath])

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white border-b-2 border-gray-100">
      <div className="flex items-center justify-between h-16 max-w-screen-xl px-4 mx-auto">
        <nav className="flex items-center">
          <Link href="/">
            <a className="text-sm font-medium">
              HyperUI
              <span aria-hidden="true" className="ml-1.5" role="img">
                🚀
              </span>
            </a>
          </Link>

          <span className="block w-px h-6 mx-4 bg-gray-100"></span>

          <div className="relative flex items-center sm:hidden">
            <button
              className="inline-flex items-center"
              onClick={() => setMenu(!menu)}
              type="button"
            >
              <IconMenu />
              <span className="ml-2 text-xs font-medium">Menu</span>
            </button>

            {menu && (
              <ul className="absolute w-40 p-2 mt-2 bg-white border-2 border-gray-100 top-full rounded-xl">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="block p-2 text-xs font-medium">
                        {link.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ul className="hidden space-x-4 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <a className="block text-xs font-medium hover:opacity-75">
                    {link.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end flex-1">
          <div className="hidden lg:block">
            <Search />
          </div>

          <a
            className="p-2 rounded hover:opacity-75"
            href="https://twitter.com/itsmarkmead"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only"> Twitter </span>

            <IconTwitter />
          </a>

          <a
            className="p-2 rounded hover:opacity-75"
            href="https://github.com/markmead/hyperui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="sr-only"> GitHub </span>

            <IconGithub />
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
