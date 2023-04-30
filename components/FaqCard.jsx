export default function FaqCard({ faqQuestion, faqAnswer }) {
  return (
    <li className="bg-white py-4 lg:py-8 lg:odd:pe-8 lg:even:ps-8">
      <h2 className="text-lg font-medium text-gray-900">{faqQuestion}</h2>

      <p className="mt-4 text-gray-600">{faqAnswer}</p>
    </li>
  )
}
