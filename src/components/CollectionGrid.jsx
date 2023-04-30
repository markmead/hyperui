import ComponentCard from '@component/ComponentCard'

export default function CollectionGrid({ componentItems }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {componentItems.map((componentData) => (
        <ComponentCard componentData={componentData} key={componentData.slug} />
      ))}
    </div>
  )
}
