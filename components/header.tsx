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

        <div className="relative flex items-center justify-end flex-1 space-x-4">
          <Link href="/ecommerce">
            <a className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100">
              Ecommerce
              <span className="ml-1.5 inline-block px-2 py-0.5 text-xs text-white bg-blue-500 rounded-full">
                WIP
              </span>
            </a>
          </Link>

          <button
            ref={buttonRef}
            type="button"
            className="p-2 bg-gray-100 rounded"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 8h16M4 16h16"
              />
            </svg>
          </button>

          {open && (
            <nav
              ref={menuRef}
              role="navigation"
              className="absolute right-0 grid grid-cols-2 gap-2 p-4 mt-1 rounded-lg bg-gray-50 top-full"
            >
              {collections.map((collection, index) => {
                let { id, title } = collection

                return (
                  <Link key={index} href={`/components/${id}`}>
                    <a className="block text-xs font-medium whitespace-nowrap hover:opacity-50">
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
