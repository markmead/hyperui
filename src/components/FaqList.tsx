'use client'

import { faqItems } from '@data/faqs'
import { QuestionItem, FaqSchema } from '@type/faq'
import FaqItem from '@component/FaqItem'

export default function FaqList() {
  const faqList: QuestionItem[] = faqItems

  const schemaData: FaqSchema = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@context': 'http://schema.org',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@type': 'FAQPage',
    mainEntity: faqList.map(({ question, answer }) => {
      return {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          '@type': 'Answer',
          text: answer,
        },
      }
    }),
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        type="application/ld+json"
      />

      <ul className="list-none p-0">
        {faqList.map(({ question, answer }, faqIndex) => (
          <FaqItem key={question} question={question} answer={answer} open={faqIndex === 0} />
        ))}
      </ul>
    </>
  )
}
