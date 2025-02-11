'use client'

import { faqItems } from '@data/faqs'
import { iFaqItem, iFaqSchema } from '@type/faq'

import FaqItem from '@component/FaqItem'

export default function FaqList() {
  const faqList: iFaqItem[] = faqItems

  const schemaData: iFaqSchema = {
    '@context': 'http://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(({ question, answer }) => {
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
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
          <FaqItem key={faqIndex} question={question} answer={answer} open={faqIndex === 0} />
        ))}
      </ul>
    </>
  )
}
