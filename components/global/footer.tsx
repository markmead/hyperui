import { FunctionComponent } from 'react'

import Link from 'next/link'

const Footer: FunctionComponent = () => {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-screen-xl px-4 py-12 mx-auto">
        <div>
          <Link href="/">
            <a className="inline-block text-lg font-medium gap-1.5">
              <span>HyperUI</span>

              <span aria-hidden="true" role="img">
                🚀
              </span>
            </a>
          </Link>

          <div className="mt-6 lg:flex lg:items-end lg:justify-between">
            <p className="max-w-md leading-relaxed text-gray-500">
              Free open source Tailwind CSS components for marketing and
              ecommerce websites, as well as application UI.
            </p>

            <p className="mt-4 text-sm text-gray-500 lg:mt-0">
              Created by Mark Mead.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
