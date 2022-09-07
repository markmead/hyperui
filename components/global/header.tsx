import { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Link as LinkInterface } from '../../interface/global'

import IconGithub from '../icon/github'
import IconTwitter from '../icon/twitter'
import Menu from './menu'

const Header: FunctionComponent = () => {
  const links: Array<LinkInterface> = [
    {
      title: 'Marketing',
      href: '/components/marketing',
    },
    {
      title: 'Ecommerce',
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
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-screen-xl">
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

          <div className="flex items-center justify-end flex-1">
            <Link href="/blog">
              <a className="block text-xs font-medium hover:opacity-75">Blog</a>
            </Link>

            <a
              className="p-2 ml-4 rounded hover:opacity-75"
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
    </>
  )
}

export default Header
