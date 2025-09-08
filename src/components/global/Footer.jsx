import Link from 'next/link'

import Brand from '@component/global/Brand'
import MarketingToggle from '@component/global/MarketingToggle'

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
    <footer className="border-t border-stone-300 bg-stone-50">
      <div className="mx-auto flex max-w-screen-xl flex-col items-start justify-between gap-4 px-4 py-8 lg:flex-row lg:py-12">
        <div className="space-y-4">
          <Brand isLarge={true} />

          <p className="stripped:hidden max-w-lg text-pretty text-stone-700">
            Free open source Tailwind CSS components for marketing and eCommerce websites, as well
            as application interfaces.
          </p>

          <ul className="flex gap-4">
            {footerLinks.map((footerLink) => (
              <li key={footerLink.href}>
                <Link
                  href={footerLink.href}
                  className="font-medium text-stone-700 transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
                >
                  {footerLink.title}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-stone-700">
            Created by{' '}
            <a
              href="https://github.com/markmead"
              rel="noreferrer"
              target="_blank"
              className="font-medium underline transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
            >
              Mark Mead
            </a>
          </p>
        </div>

        <MarketingToggle />
      </div>
    </footer>
  )
}
