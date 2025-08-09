export default function UspList() {
  const uspItems = ['No install', 'No config', 'No setup']

  return (
    <ul className="flex gap-3">
      {uspItems.map((uspItem, itemIndex) => (
        <li
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 py-2 leading-none"
          key={itemIndex}
        >
          <span aria-hidden="true">✅</span>

          <span className="text-sm font-medium text-gray-900">{uspItem}</span>
        </li>
      ))}
    </ul>
  )
}
