'use client'

import { useState } from 'react'

import Script from 'next/script'

import Container from '@component/Container'
import ButtonStyle from '@component/ButtonStyle'
import HeroBanner from '@component/HeroBanner'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [aiRequest, setAiRequest] = useState('')
  const [codeSnippet, setCodeSnippet] = useState('')

  async function createRequest(e) {
    e.preventDefault()

    setIsLoading(true)

    const aiResponse = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [{ role: 'user', content: aiRequest }] }),
    })

    const aiResponseJson = await aiResponse.json()

    const { choices: resultChoices } = aiResponseJson

    if (!resultChoices.length) {
      return
    }

    const aiOutput = resultChoices[0].message.content

    const codeSnippet = aiOutput
      .match(/```html([\s\S]*?)```/g)[0]
      .replace('```html', '')
      .replace('```', '')

    setCodeSnippet(codeSnippet)

    setIsLoading(false)
  }

  return (
    <div>
      <Script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio" />

      <HeroBanner title="AI Component Generator" subtitle="Generate HTML components using AI" />

      <Container classNames="py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <form action="#" onSubmit={(e) => createRequest(e)}>
              <label htmlFor="AiRequest" className="sr-only">
                Request a component
              </label>

              <textarea
                className="h-64 w-full rounded-md border-gray-200 sm:text-sm"
                placeholder="Describe your component..."
                id="AiRequest"
                onInput={(e) => setAiRequest(e.target.value)}
              ></textarea>

              <button>
                <ButtonStyle buttonEmoji="🤖" buttonText="Generate" />
              </button>
            </form>
          </div>

          <div>
            <div className="prose max-w-none">
              <pre className="h-64">{codeSnippet}</pre>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl lg:mt-12">
          <div className="min-h-64 rounded-md bg-white bg-[linear-gradient(45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(-45deg,_rgb(249_250_251)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgb(249_250_251)_75%),_linear-gradient(-45deg,_transparent_75%,_rgb(249_250_251)_75%)] bg-[length:_20px_20px] p-6 ring-2 ring-gray-900 [background-position:_0_0,_0_10px,_10px_-10px,_-10px_0px]">
            <div dangerouslySetInnerHTML={{ __html: codeSnippet }}></div>
          </div>
        </div>
      </Container>
    </div>
  )
}
