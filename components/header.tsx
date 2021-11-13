import { FunctionComponent, useEffect } from 'react'

import { useState, useRef } from 'react'
import { useRouter } from 'next/router'

import Link from 'next/link'

import { collections } from '../lib/collections'

const Header: FunctionComponent = () => {
  let router = useRouter()
  let [open, setOpen] = useState(false)
  let menuRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [router.asPath])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white">
      <div className="container flex items-center justify-between h-16">
        <Link href="/">Home</Link>

        <div className="relative">
          <button type="button" onClick={() => setOpen(!open)}>
            Menu
          </button>

          {open && (
            <nav
              ref={menuRef}
              role="navigation"
              className="absolute right-0 top-auto p-4 bg-white rounded-lg shadow-xl"
            >
              {collections.map((collection, index) => {
                let { id, title } = collection

                return (
                  <Link key={index} href={`/collections/${id}`}>
                    <a className="block">{title}</a>
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
