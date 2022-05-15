import { FunctionComponent, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { links } from '../../data/header/links'

import Menu from './menu'

const Header: FunctionComponent = () => {
  let router = useRouter()
  let [menu, setMenu] = useState(false)

  useEffect(() => {
    setMenu(false)
  }, [router.asPath])

  return (
    <header>
      <nav>
        <Link href="/">
          <a>HyperUI</a>
        </Link>

        {/* <Menu menu={menu} handleMenu={setMenu} links={links} /> */}

        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a>{link.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Link href="/blog">
        <a>HyperUI Blog</a>
      </Link>

      <a
        href="https://twitter.com/itsmarkmead"
        rel="noopener noreferrer"
        target="_blank"
      >
        Twitter
      </a>

      <a
        href="https://github.com/markmead/hyperui"
        rel="noopener noreferrer"
        target="_blank"
      >
        GitHub
      </a>
    </header>
  )
}

export default Header
