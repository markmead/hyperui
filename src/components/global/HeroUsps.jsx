export default function HeroUsps({ uspItems = ['No install', 'No config', 'No setup'] }) {
  return (
    <ul className="flex justify-center gap-4">
      {uspItems.map((uspItem, itemIndex) => (
        <li
          className="inline-flex h-10 items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4"
          key={itemIndex}
        >
          <span aria-hidden="true">✅</span>

          <span className="font-medium text-gray-900">{uspItem}</span>
        </li>
      ))}
    </ul>
  )
}
