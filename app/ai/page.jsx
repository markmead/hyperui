'use client'

import { useState } from 'react'

import { aiPreviewHtml } from '@util/transformers'

import AiPreview from '@component/AiPreview'
import ButtonStyle from '@component/ButtonStyle'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import Ad from '@component/Ad'

export default function Page() {
  const [requestPrompt, setRequestPrompt] = useState('')
  const [previewCode, setPreviewCode] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function createRequest(e) {
    e.preventDefault()

    setIsLoading(true)
    setErrorMessage('')
    setPreviewCode('')
    setPreviewHtml('')

    try {
      const formatPrompt = requestPrompt
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/([^.])$/, '$1.')
        .trim()

      const aiResponse = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: formatPrompt }],
        }),
      })

      const aiResponseJson = await aiResponse.json()

      const { choices: resultChoices } = aiResponseJson

      if (!resultChoices.length) {
        throw new Error()
      }

      let aiOutput = resultChoices[0].message.content

      aiOutput = aiOutput.trim()

      setPreviewCode(aiOutput)
      setPreviewHtml(aiPreviewHtml(aiOutput))
    } catch {
      setErrorMessage('Failed to generate AI response. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className={isLoading ? 'pointer-events-none' : ''}>
      <HeroBanner noAd title="AI" subtitle="Tailwind CSS Component Creator Powered by AI" />

      <Container classNames={`pb-8 lg:pb-12 space-y-8 ${isLoading ? 'animate-pulse' : ''}`}>
        <div className="mx-auto max-w-xl space-y-4">
          <div role="alert" className="rounded border-s-4 border-blue-500 bg-blue-50 p-4">
            <strong className="block font-medium text-blue-800"> Heads up </strong>

            <p className="mt-2 text-sm text-blue-700">
              This feature is in beta. Please provide feedback on the{' '}
              <a
                href="https://github.com/markmead/hyperui/discussions/453"
                target="_blank"
                rel="noreferrer"
                className="inline-block underline"
              >
                GitHub Discussion
              </a>
              .
            </p>
          </div>

          <form action="#" onSubmit={(e) => createRequest(e)} className="space-y-4">
            <div>
              <label htmlFor="AiPrompt" className="sr-only">
                Request a component
              </label>

              <textarea
                className="h-32 w-full rounded-md border-gray-200 sm:text-sm"
                placeholder="Describe the component you want to generate. Be as detailed as possible."
                id="AiPrompt"
                minLength="25"
                maxLength="500"
                onInput={(e) => setRequestPrompt(e.target.value)}
              ></textarea>

              <small className="mt-0.5 block text-right text-sm text-gray-500">
                {requestPrompt.length} / 500 characters
              </small>
            </div>

            <button
              disabled={requestPrompt.length < 25 || requestPrompt.length > 500}
              className="disabled:opacity-50"
            >
              <ButtonStyle buttonEmoji="🤖" buttonText="Generate" />
            </button>
          </form>
        </div>

        <Ad isCenter adStyle="stickybox" />

        <div>
          {errorMessage ? (
            <div className="mx-auto max-w-xl">
              <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <strong className="block font-medium text-red-800"> Something went wrong </strong>

                <p className="mt-2 text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          ) : (
            <AiPreview previewCode={previewCode} previewHtml={previewHtml} />
          )}
        </div>
      </Container>

      {isLoading && (
        <div className="fixed inset-0 z-[100] grid place-content-center bg-gray-900/50">
          <Loading />
        </div>
      )}
    </div>
  )
}

function Loading() {
  return (
    <svg
      className="h-12 w-12 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>

      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
