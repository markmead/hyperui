import { FunctionComponent } from 'react'

import BrandLogo from './BrandLogo'

const Footer: FunctionComponent = () => {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-screen-xl px-4 py-12 mx-auto">
        <div>
          <BrandLogo />

          <div className="mt-6 lg:flex lg:items-end lg:justify-between">
            <p className="max-w-md leading-relaxed text-gray-500">
              Free open source Tailwind CSS components for marketing and
              eCommerce websites, as well as application UI.
            </p>

            <p className="mt-4 text-sm text-gray-500 lg:mt-0">
              Created by{' '}
              <a
                href="https://twitter.com/itsmarkmead"
                rel="noreferrer"
                target="_blank"
                className="font-medium text-gray-700 hover:text-gray-600"
              >
                Mark Mead
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
