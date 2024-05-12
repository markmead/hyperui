import Link from 'next/link'

export default function HeaderMenuLinks({ menuLinks, navClass, ulClass }) {
  return (
    <nav aria-label="Global" className={navClass && navClass}>
      <ul className={ulClass && ulClass}>
        {menuLinks.map((menuLink) => {
          return (
            <li key={menuLink.href}>
              <Link
                href={menuLink.href}
                className="text-sm font-medium text-gray-900 hover:opacity-75"
              >
                {menuLink.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
