import { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Link as LinkInterface } from '../interface/global'

import Menu from './Menu'
import Search from './Search'

const Header: FunctionComponent = () => {
  const links: Array<LinkInterface> = [
    {
      title: 'Marketing',
      href: '/components/marketing',
    },
    {
      title: 'eCommerce',
      href: '/components/ecommerce',
    },
    {
      title: 'Application UI',
      href: '/components/application-ui',
    },
  ]

  let router = useRouter()
  let [menu, setMenu] = useState(false)

  useEffect(() => {
    setMenu(false)
  }, [router.asPath])

  return (
    <>
      <header className="sticky inset-x-0 top-0 z-50 bg-white border-b-2 border-gray-100">
        <div className="flex items-center justify-between h-16 max-w-screen-xl px-4 mx-auto">
          <nav className="flex items-center">
            <Link href="/">
              <a className="text-sm font-medium inline-flex gap-1.5">
                <span>HyperUI</span>

                <span aria-hidden="true" role="img">
                  🚀
                </span>
              </a>
            </Link>

            <span className="block w-px h-6 mx-4 bg-gray-100"></span>

            <Menu menu={menu} handleMenu={setMenu} links={links} />

            <ul className="hidden sm:gap-4 sm:flex">
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

          <div className="flex items-center justify-end flex-1 gap-4">
            <Search />

            <Link href="/blog">
              <a className="block text-xs font-medium hover:opacity-75">Blog</a>
            </Link>

            <div className="flex">
              <a
                className="p-2 rounded hover:opacity-75"
                href="https://twitter.com/itsmarkmead"
                rel="noreferrer"
                target="_blank"
              >
                <span className="sr-only"> Twitter </span>

                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <a
                className="p-2 rounded hover:opacity-75"
                href="https://github.com/markmead/hyperui"
                rel="noreferrer"
                target="_blank"
              >
                <span className="sr-only"> GitHub </span>

                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
