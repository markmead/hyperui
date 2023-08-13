'use client'

export default function FaqList({ faqItems }) {
  const transformedFaqItems = Object.values(faqItems).map((faqItem) => {
    return {
      question: faqItem.question,
      answer: faqItem.answer,
    }
  })

  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      transformedFaqItems.map((faqItem) => {
        return {
          '@type': 'Question',
          name: faqItem.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faqItem.answer,
          },
        }
      }),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <ul>
        {transformedFaqItems.map((faqItem, faqIndex) => (
          <li key={faqIndex}>
            <details class="group" open={faqIndex === 0}>
              <summary className="flex cursor-pointer items-center justify-between text-gray-900">
                <strong className="text-lg font-medium">
                  {faqItem.question}
                </strong>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5 transition group-open:rotate-180"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </summary>

              <p>{faqItem.answer}</p>
            </details>
          </li>
        ))}
      </ul>
    </>
  )
}
