import Link from 'next/link'

import Brand from '@component/global/Brand'
import Container from '@component/global/Container'

export default function Footer() {
  const footerLinks = [
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
    <footer className="border-t border-gray-300 bg-gray-50">
      <Container classNames="py-8 lg:py-12 space-y-4">
        <Brand isLarge={true} />

        <p className="max-w-lg text-pretty text-gray-700">
          Free open source Tailwind CSS components for marketing and eCommerce websites, as well as
          application interfaces.
        </p>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <ul className="flex gap-4">
            {footerLinks.map((footerLink) => (
              <li key={footerLink.href}>
                <Link
                  href={footerLink.href}
                  className="font-medium text-gray-700 transition-colors hover:text-gray-900 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
                >
                  {footerLink.title}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-gray-700">
            Created by{' '}
            <a
              href="https://github.com/markmead"
              rel="noreferrer"
              target="_blank"
              className="font-medium underline transition-colors hover:text-gray-900 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
            >
              Mark Mead
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
