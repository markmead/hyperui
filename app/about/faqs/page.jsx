import { faqItems } from '@data/faqs'

import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import FaqGrid from '@component/FaqGrid'

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

      <Container classNames="pb-8 lg:pb-12">
        <FaqGrid faqItems={faqItems} />
      </Container>
    </>
  )
}
