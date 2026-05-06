import type { APIRoute } from 'astro'

export const prerender = false

const SYSTEM_PROMPT = `You are a Tailwind CSS dark mode expert. Add dark: variant classes to an HTML file that uses Tailwind CSS.

Rules:
1. Keep the HTML structure EXACTLY the same — only modify class attributes.
2. Append dark: variant classes to existing class strings where appropriate.
3. Do not add dark: classes that are already present.
4. Return ONLY the modified HTML — no markdown fences, no explanations.
5. The <html> element already has class="dark" to enable Tailwind dark mode.

Common transformations:
- bg-white            → add dark:bg-gray-900
- bg-gray-50          → add dark:bg-gray-800
- bg-gray-100         → add dark:bg-gray-800
- bg-gray-200         → add dark:bg-gray-700
- text-gray-900       → add dark:text-white
- text-gray-800       → add dark:text-gray-100
- text-gray-700       → add dark:text-gray-200
- text-gray-600       → add dark:text-gray-300
- text-gray-500       → add dark:text-gray-400
- border-gray-100     → add dark:border-gray-800
- border-gray-200     → add dark:border-gray-700
- hover:bg-gray-50    → add dark:hover:bg-gray-800
- hover:bg-gray-100   → add dark:hover:bg-gray-700
- ring-gray-200       → add dark:ring-gray-700`

export const POST: APIRoute = async ({ request, locals }) => {
  let html: string | undefined

  try {
    const body = await request.json()
    html = body?.html
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!html || typeof html !== 'string') {
    return new Response(JSON.stringify({ error: 'Missing or invalid "html" field' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const env = (locals as { runtime?: { env?: Record<string, string> } }).runtime?.env
  const apiKey = env?.OPENAI_API_KEY

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY is not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  let openaiResponse: Response

  try {
    openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: html },
        ],
        temperature: 0.1,
      }),
    })
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to reach OpenAI API' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (!openaiResponse.ok) {
    return new Response(JSON.stringify({ error: `OpenAI API error: ${openaiResponse.status}` }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const data = (await openaiResponse.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }

  const darkHtml = data.choices?.[0]?.message?.content?.trim()

  if (!darkHtml) {
    return new Response(JSON.stringify({ error: 'Empty response from OpenAI API' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ html: darkHtml }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
