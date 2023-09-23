'use client'

export default function SponsorGrid() {
  // eslint-disable-next-line no-unused-vars
  const sponsorItems = Array.from({ length: 12 }).map((_) => ({
    name: 'Name or logo here',
    href: '#',
    image: '',
  }))

  return (
    <div className="not-prose my-[1.25em] lg:-ms-[10ch] lg:w-[85ch]">
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 [&:hover>li]:opacity-50">
        {sponsorItems.map((sponsorItem, sponsorIndex) => (
          <li
            key={sponsorIndex}
            className="relative grid aspect-video place-content-center rounded bg-gray-50 p-4 transition hover:!opacity-100"
          >
            <a
              href="https://github.com/sponsors/markmead"
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0"
            ></a>

            <p className="text-sm font-medium text-gray-900">
              {sponsorItem.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
