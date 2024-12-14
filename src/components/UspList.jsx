export default function UspList() {
  const uspItems = ['No install', 'No config', 'No setup']

  return (
    <div>
      <ul className="flex items-center justify-center gap-6">
        {uspItems.map((uspItem, itemIndex) => (
          <li className="inline-flex items-center gap-1" key={itemIndex}>
            <span role="img" aria-hidden="true">
              ✅
            </span>

            <span className="text-sm font-medium text-gray-900">{uspItem}</span>
          </li>
        ))}
      </ul>

      <p className="mt-2 text-base/relaxed text-pretty text-gray-700">
        Copy and paste components to build your next project.
      </p>
    </div>
  )
}
