import { QuestionItem } from '@type/faq'

interface Props extends QuestionItem {
  open: boolean
}

export default function FaqItem({ question, answer, open }: Props) {
  return (
    <li className="rounded-lg bg-gray-50 p-4">
      <details className="group" open={open}>
        <summary className="flex cursor-pointer items-center justify-between text-gray-900">
          <strong className="text-lg font-medium">{question}</strong>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5 shrink-0 group-open:rotate-180"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </summary>

        <p>{answer}</p>
      </details>
    </li>
  )
}
