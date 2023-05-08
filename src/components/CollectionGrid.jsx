import CollectionCard from '@/components/CollectionCard'

export default function CollectionGrid({ componentItems }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {componentItems.map((componentData) => (
        <CollectionCard
          componentData={componentData}
          key={componentData.slug}
        />
      ))}
    </div>
  )
}
