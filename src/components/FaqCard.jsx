export default function FaqCard({ faqQuestion, faqAnswer }) {
  return (
    <div className="py-4 lg:py-8">
      <h2 className="text-lg font-medium text-gray-900">{faqQuestion}</h2>

      <p className="mt-4 text-gray-600">{faqAnswer}</p>
    </div>
  )
}
