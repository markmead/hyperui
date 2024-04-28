import { NextResponse } from 'next/server'

import OpenAI from 'openai'

export const runtime = 'edge'

const aiClient = new OpenAI({
  apiKey: process.env.TOGETHER_API_KEY,
  baseURL: 'https://api.together.xyz/v1',
})

export async function POST(nextReq) {
  const reqBody = await nextReq.json()
  const reqMessages = reqBody.messages ?? []

  try {
    const aiResponse = await aiClient.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a Tailwind CSS developer creating HTML components.',
        },
        {
          role: 'system',
          content:
            'You have been asked to create a component that needs to be responsive and accessible.',
        },
        {
          role: 'system',
          content: 'Make sure to use Tailwind CSS classes and write clean, semantic HTML.',
        },
        {
          role: 'system',
          content: 'You can use modern CSS features found in the latest version of Tailwind CSS.',
        },
        {
          role: 'system',
          content: 'Make sure the component has a background color.',
        },
        {
          role: 'system',
          content: 'Remember, Tailwind CSS breakpoints are mobile first.',
        },
        ...reqMessages,
        {
          role: 'system',
          content: 'If there is an image use https://source.unsplash.com/random.',
        },
        {
          role: 'system',
          content: 'Only return the HTML, no explanation text is needed.',
        },
      ],
      model: 'codellama/CodeLlama-70b-Instruct-hf',
      max_tokens: 1024,
    })

    return NextResponse.json(aiResponse)
  } catch {
    return NextResponse.error('Failed to generate AI response')
  }
}
