import HeaderLinks from '@component/global/HeaderLinks'

export default function HeaderMenu({ showMenu, headerLinks, handleSetShowMenu }) {
  const filteredHeaderLinks = headerLinks.filter(({ mobile }) => mobile)

  return (
    <div className="flex items-center md:hidden">
      <button
        onClick={() => handleSetShowMenu(!showMenu)}
        className="text-stone-700 transition-colors hover:text-stone-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
      >
        <Icon />

        <span className="sr-only">Toggle menu</span>
      </button>

      {showMenu && (
        <div className="absolute inset-x-0 top-full mt-2 px-2">
          <nav className="rounded-lg border border-stone-300 bg-white p-4 shadow-lg">
            <HeaderLinks headerLinks={filteredHeaderLinks} />
          </nav>
        </div>
      )}
    </div>
  )
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
