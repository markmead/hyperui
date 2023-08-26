'use client'

export default function SponsorGrid() {
  const sponsorItems = Array.from({ length: 12 })

  return (
    <div className="not-prose space-y-4 lg:-ms-[10ch] lg:w-[85ch]">
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4">
        {sponsorItems.map((_, sponsorIndex) => (
          <li
            key={sponsorIndex}
            className="grid aspect-video place-content-center rounded bg-gray-50 p-4"
          ></li>
        ))}
      </ul>
    </div>
  )
}
