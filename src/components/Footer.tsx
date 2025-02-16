import Link from 'next/link'

import { PageLink } from '@type/site'
import Container from '@component/Container'
import BrandLogo from '@component/BrandLogo'

export default function Footer() {
  const menuLinks: PageLink[] = [
    {
      title: 'FAQs',
      href: '/about/faqs',
    },
    {
      title: 'Acknowledgements',
      href: '/about/acknowledgements',
    },
  ]

  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container classNames="py-8 lg:py-12">
        <BrandLogo fontSize="text-lg" />

        <div className="mt-6">
          <p className="max-w-md leading-relaxed text-pretty text-gray-700">
            Free open source Tailwind CSS components for marketing and eCommerce websites, as well
            as application UI.
          </p>

          <div className="mt-4 lg:flex lg:items-end lg:justify-between">
            <ul className="flex gap-4">
              {menuLinks.map(({ href, title }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="block text-sm font-medium text-gray-900 hover:opacity-75"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-gray-700 lg:mt-0">
              Created by{' '}
              <a
                href="https://github.com/markmead"
                rel="noreferrer"
                target="_blank"
                className="inline-block font-medium hover:text-gray-900"
              >
                Mark Mead
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
