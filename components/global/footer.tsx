import { FunctionComponent } from 'react'

import Link from 'next/link'

import { links } from '../../data/header/links'

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-gray-100">
      <div className="px-4 py-12 mx-auto max-w-screen-xl lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <Link href="/">
              <a className="inline-block text-lg font-medium">
                HyperUI
                <span aria-hidden="true" className="ml-1.5" role="img">
                  🚀
                </span>
              </a>
            </Link>

            <p className="max-w-md mt-6 leading-relaxed text-gray-500">
              Free open source Tailwind CSS components for marketing and
              ecommerce websites, as well as application UI.
            </p>
          </div>

          <nav className="mt-12 lg:mt-0" aria-labelledby="footer-navigation">
            <h2 className="sr-only" id="footer-navigation">
              Footer navigation
            </h2>

            <ul className="flex flex-wrap gap-6 lg:justify-end md:gap-8 lg:gap-12">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-gray-700 transition hover:text-gray-700/75">
                      {link.title}
                    </a>
                  </Link>
                </li>
              ))}

              <li>
                <Link href="/blog">
                  <a className="text-gray-700 transition hover:text-gray-700/75">
                    Blog
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-12 text-sm text-gray-400 lg:text-right">
          Created by Mark Mead.
        </p>
      </div>
    </footer>
  )
}

export default Footer
