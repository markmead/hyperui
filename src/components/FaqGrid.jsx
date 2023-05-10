import FaqCard from '@component/FaqCard'

export default function FaqGrid({ faqItems }) {
  return (
    <ul className="grid gap-px bg-gray-100 sm:grid-cols-2">
      {faqItems.map((faqItem, faqIndex) => (
        <li
          key={faqIndex}
          className="bg-white sm:odd:pe-6 sm:even:ps-6 lg:odd:pe-8 lg:even:ps-8"
        >
          <FaqCard faqQuestion={faqItem.question} faqAnswer={faqItem.answer} />
        </li>
      ))}
    </ul>
  )
}
