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
          content: 'If there is an image get it from Unsplash.',
        },
        {
          role: 'system',
          content: 'Make sure to use Tailwind CSS classes.',
        },
        {
          role: 'system',
          content: 'The component should be responsive.',
        },
        {
          role: 'system',
          content: 'The component should be accessible.',
        },
        {
          role: 'system',
          content: 'Make sure there is a background color.',
        },
        ...reqMessages,
      ],
      model: 'codellama/CodeLlama-70b-Instruct-hf',
      max_tokens: 1024,
    })

    return NextResponse.json(aiResponse)
  } catch {
    return NextResponse.error('Failed to generate AI response')
  }
}
