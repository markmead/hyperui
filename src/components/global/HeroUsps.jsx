export default function HeroUsps({ uspItems = ['No install', 'No config', 'No setup'] }) {
  return (
    <ul className="flex justify-center gap-4">
      {uspItems.map((uspItem, itemIndex) => (
        <li className="inline-flex items-center gap-2" key={itemIndex}>
          <span aria-hidden="true">✅</span>

          <span className="font-medium text-stone-900">{uspItem}</span>
        </li>
      ))}
    </ul>
  )
}
