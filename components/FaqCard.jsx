export default function FaqCard({ faqQuestion, faqAnswer }) {
  return (
    <li className="bg-white py-4 dark:bg-gray-900 lg:py-8 lg:odd:pe-8 lg:even:ps-8">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white">
        {faqQuestion}
      </h2>

      <p className="mt-4 text-gray-600 dark:text-gray-400">{faqAnswer}</p>
    </li>
  )
}
