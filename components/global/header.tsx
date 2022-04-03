import { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { links } from '../../data/header/links'

import IconGithub from '../icon/github'
import IconTwitter from '../icon/twitter'
import Menu from './menu'

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

          <Menu menu={menu} handleMenu={setMenu} links={links} />

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
          <Link href="https://twwordle.hyperui.dev/">
            <a className="block text-xs font-medium text-center hover:opacity-75">
              <span aria-hidden="true" className="mr-1.5" role="img">
                🟧
              </span>
              Tailwind CSS Wordle
              <span aria-hidden="true" className="ml-1.5" role="img">
                🟩
              </span>
            </a>
          </Link>

          <a
            className="p-2 rounded lg:ml-8 hover:opacity-75"
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
