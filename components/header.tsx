import { FunctionComponent, useEffect } from 'react'

import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

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
        <Link href="/">
          <a className="text-sm font-medium">HyperUI</a>
        </Link>

        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg"
            onClick={() => setOpen(!open)}
          >
            Menu
          </button>

          {open && (
            <nav
              ref={menuRef}
              role="navigation"
              className="absolute right-0 top-auto p-4 mt-1 space-y-1 bg-gray-100 rounded-lg shadow-xl"
            >
              {collections.map((collection, index) => {
                let { id, title } = collection

                return (
                  <Link key={index} href={`/collections/${id}`}>
                    <a className="block text-sm font-medium">{title}</a>
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
