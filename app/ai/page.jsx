'use client'

import { useState } from 'react'

import { aiPreviewHtml } from '@util/transformers'

import AiPreview from '@component/AiPreview'
import ButtonStyle from '@component/ButtonStyle'
import Container from '@component/Container'
import HeroBanner from '@component/HeroBanner'
import Loading from '@component/Loading'
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

      console.log(formatPrompt)

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
        <div className="mx-auto max-w-xl">
          <form action="#" onSubmit={(e) => createRequest(e)}>
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

            <div className="mt-4">
              <button
                disabled={requestPrompt.length < 25 || requestPrompt.length > 500}
                className="disabled:opacity-50"
              >
                <ButtonStyle buttonEmoji="🤖" buttonText="Generate" />
              </button>
            </div>
          </form>
        </div>

        <Ad isCenter adStyle="stickybox" />

        <div>
          {errorMessage ? (
            <div className="mx-auto max-w-xl">
              <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <strong class="block font-medium text-red-800"> Something went wrong </strong>

                <p class="mt-2 text-sm text-red-700">{errorMessage}</p>
              </div>
            </div>
          ) : (
            <AiPreview
              previewTitle="AI Response"
              previewCode={previewCode}
              previewHtml={previewHtml}
            />
          )}
        </div>
      </Container>

      {isLoading && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-gray-900/50">
          <Loading />
        </div>
      )}
    </div>
  )
}
