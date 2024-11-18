import Link from 'next/link'

import Container from '@component/Container'
import BrandLogo from '@component/BrandLogo'

export default function Footer() {
  const menuLinks = [
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
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <Container classNames="py-8 lg:py-12">
        <BrandLogo fontSize="text-lg" />

        <div className="mt-6">
          <p className="max-w-md text-pretty leading-relaxed text-gray-700 dark:text-gray-200">
            Free open source Tailwind CSS components for marketing and eCommerce websites, as well
            as application UI.
          </p>

          <div className="mt-4 lg:flex lg:items-end lg:justify-between">
            <ul className="flex gap-4">
              {menuLinks.map((menuLink) => (
                <li key={menuLink.href}>
                  <Link
                    href={menuLink.href}
                    className="block text-sm font-medium text-gray-900 hover:opacity-75 dark:text-white"
                  >
                    {menuLink.title}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-gray-700 lg:mt-0 dark:text-gray-200">
              Created by{' '}
              <a
                href="https://github.com/markmead"
                rel="noreferrer"
                target="_blank"
                className="inline-block font-medium hover:text-gray-900 dark:hover:text-white"
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
