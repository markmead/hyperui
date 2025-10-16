const USP_LIST = ['No install', 'No config', 'No setup']

export default function HeroUsps() {
  return (
    <ul className="flex justify-center gap-4">
      {USP_LIST.map((uspItem, itemIndex) => (
        <li className="inline-flex items-center gap-2" key={itemIndex}>
          <span aria-hidden="true">✅</span>

          <span className="font-medium text-stone-900">{uspItem}</span>
        </li>
      ))}
    </ul>
  )
}
