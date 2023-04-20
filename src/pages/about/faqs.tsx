import Head from 'next/head'

import Banner from '@/components/HeroBanner'

import { faqItems } from '@/data/faqs'
import { FaqItem } from '@/interface/global'

function Faqs() {
  const schemaData = {
    '@context': 'http://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      faqItems.map((faqItem: FaqItem) => {
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
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
        <title>FAQs | HyperUI</title>
        <meta
          name="description"
          content="Get your questions about HyperUI answered with these FAQs."
          key="description"
        />
        <meta property="og:title" content={`$FAQs | HyperUI`} key="og:title" />
        <meta
          property="og:description"
          content="Get your questions about HyperUI answered with these FAQs."
          key="og:description"
        />
        <meta
          name="twitter:title"
          content={`$FAQs | HyperUI`}
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="Get your questions about HyperUI answered with these FAQs."
          key="twitter:description"
        />
      </Head>

      <Banner title="FAQs" subtitle="Quick Info for HyperUI">
        Got questions? I've got answers. Hopefully these answer any questions
        you have about HyperUI. If not, then please reach out on GitHub.
      </Banner>

      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <ul className="-mt-4 grid gap-px bg-gray-100 sm:-mt-6 sm:grid-cols-2 lg:-mt-8">
          {faqItems.map((faqItem: FaqItem) => {
            return (
              <li className="bg-white p-4 sm:p-6 lg:p-8" key={faqItem.question}>
                <h2 className="text-lg font-medium text-gray-900">
                  {faqItem.question}
                </h2>

                <p className="mt-4 text-gray-600">{faqItem.answer}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Faqs
