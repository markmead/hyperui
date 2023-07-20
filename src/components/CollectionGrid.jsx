import CollectionCard from '@component/CollectionCard'

export default function CollectionGrid({ componentItems }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {componentItems.map((componentData) => (
        <li key={componentData.id}>
          <CollectionCard componentData={componentData} />
        </li>
      ))}
    </ul>
  )
}
