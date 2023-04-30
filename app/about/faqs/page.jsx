import { faqItems } from '@data/faqs'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import FaqCard from '@component/FaqCard'

export const metadata = {
  title: 'FAQs | HyperUI',
  description: 'Get your questions about HyperUI answered with these FAQs.',
  openGraph: {
    title: 'FAQs | HyperUI',
    description: 'Get your questions about HyperUI answered with these FAQs.',
    url: 'https://www.hyperui.dev/',
    siteName: 'HyperUI',
    type: 'website',
    image: 'https://www.hyperui.dev/og.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQs | HyperUI',
    description: 'Get your questions about HyperUI answered with these FAQs.',
  },
}

export default async function Page() {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      faqItems.map((faqItem) => {
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

      <HeroBanner title="FAQs" subtitle="Quick Info for HyperUI">
        Got questions? I have answers. Hopefully these answer any questions you
        have about HyperUI. If not, then please reach out on GitHub.
      </HeroBanner>

      <Container>
        <ul className="grid gap-px bg-gray-100 dark:bg-gray-800 sm:grid-cols-2">
          {faqItems.map((faqItem, faqIndex) => (
            <FaqCard
              key={faqIndex}
              faqQuestion={faqItem.question}
              faqAnswer={faqItem.answer}
            />
          ))}
        </ul>
      </Container>
    </>
  )
}
