import Banner from '@/components/HeroBanner'

import { faqItems } from '@/data/faqs'
import { FaqItem } from '@/interface/global'

function Faqs() {
  return (
    <>
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
