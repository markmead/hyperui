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
    <header>
      <div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="font-medium">
              HyperUI
              <span role="img" aria-hidden="true">
                🚀
              </span>
            </a>
          </Link>

          <div className="block sm:hidden">
            <button className="inline-flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span className="text-sm font-medium"> Menu </span>
            </button>
          </div>

          <nav className="hidden sm:block">
            <ul className="flex items-center gap-4">
              <li>
                <Link href="/components/marketing">
                  <a className="text-sm font-medium text-gray-700">Marketing</a>
                </Link>
              </li>

              <li>
                <Link href="/components/ecommerce">
                  <a className="text-sm font-medium text-gray-700">eCommerce</a>
                </Link>
              </li>

              <li>
                <Link href="/components/application-ui">
                  <a className="text-sm font-medium text-gray-700">
                    Application UI
                  </a>
                </Link>
              </li>

              <li
                aria-hidden="true"
                className="w-px h-4 bg-gray-300 rounded-full"
              ></li>

              <li>
                <Link href="/blog">
                  <a className="text-sm font-medium text-gray-700">Blog</a>
                </Link>
              </li>

              <li>
                <Link href="/faqs">
                  <a className="text-sm font-medium text-gray-700">FAQs</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
