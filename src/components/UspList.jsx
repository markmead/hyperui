export default function UspList() {
  const uspItems = ['No install', 'No config', 'No setup']

  return (
    <ul className="flex items-center justify-center gap-6">
      {uspItems.map((uspItem, itemIndex) => (
        <li className="inline-flex items-center gap-1" key={itemIndex}>
          <span aria-hidden="true">✅</span>

          <span className="text-sm font-medium text-gray-900">{uspItem}</span>
        </li>
      ))}
    </ul>
  )
}
