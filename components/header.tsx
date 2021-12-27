import { FunctionComponent, useEffect } from 'react'

import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

import IconGithub from './icon/github'
import IconMenu from './icon/menu'

import { collections } from '../lib/collections'

const Header: FunctionComponent = () => {
  let router = useRouter()
  let [open, setOpen] = useState(false)
  let menuRef = useRef<HTMLElement>(null)
  let buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        event.target !== buttonRef.current
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-white border-b border-gray-100">
      <div className="container flex items-center justify-between h-16">
        <nav role="navigation" className="flex items-center space-x-4">
          <Link href="/">
            <a className="text-sm font-medium">
              HyperUI
              <span role="img" className="ml-1.5">
                🚀
              </span>
            </a>
          </Link>

          <span className="hidden w-px h-6 bg-gray-100 lg:block"></span>

          <Link href="/">
            <a className="hidden text-xs font-medium lg:block">Components</a>
          </Link>

          <Link href="/ecommerce">
            <a className="hidden text-xs font-medium lg:block">Ecommerce</a>
          </Link>
        </nav>

        <div className="relative flex items-center justify-end flex-1 space-x-4">
          <button
            ref={buttonRef}
            type="button"
            className="p-2 bg-gray-100 rounded"
            onClick={() => setOpen(!open)}
          >
            <IconMenu style="w-4 h-4" />
          </button>

          <a
            href="https://github.com/markmead/hyperui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded"
          >
            <IconGithub style="w-4 h-4" />
          </a>

          {open && (
            <nav
              ref={menuRef}
              role="navigation"
              className="absolute right-0 grid grid-cols-2 p-4 mt-1 rounded gap-x-4 gap-y-2 bg-gray-50 top-full"
            >
              {collections.map((collection, index) => {
                let { id, title } = collection

                return (
                  <Link key={index} href={`/components/${id}`}>
                    <a className="block text-xs font-medium hover:opacity-50">
                      {title}
                    </a>
                  </Link>
                )
              })}
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
