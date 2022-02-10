import { FunctionComponent } from 'react'

import Link from 'next/link'

import IconGithub from './icon/github'
import IconTwitter from './icon/twitter'
import Search from './search'

const Header: FunctionComponent = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white border-b-2 border-gray-100">
      <div className="flex items-center justify-between h-16 max-w-screen-xl px-4 mx-auto">
        <nav role="navigation" className="flex items-center space-x-4">
          <Link href="/">
            <a className="text-sm font-medium">
              HyperUI
              <span role="img" className="ml-1.5">
                🚀
              </span>
            </a>
          </Link>

          <span className="block w-px h-6 bg-gray-100"></span>

          <Link href="/">
            <a className="hidden text-xs font-medium lg:block hover:opacity-75">
              Components
            </a>
          </Link>

          <Link href="/ecommerce">
            <a className="block text-xs font-medium hover:opacity-75">
              Ecommerce
            </a>
          </Link>
        </nav>

        <div className="flex items-center justify-end flex-1">
          <div className="hidden lg:block">
            <Search />
          </div>

          <a
            href="https://twitter.com/itsmarkmead"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded hover:opacity-75"
          >
            <span className="sr-only"> Twitter </span>
            <IconTwitter />
          </a>

          <a
            href="https://github.com/markmead/hyperui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded hover:opacity-75"
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
