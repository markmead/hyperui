import { test, expect } from './fixtures'

const rpc = (method: string, params?: unknown) => ({
  data: { jsonrpc: '2.0', id: 1, method, params },
})

test.describe('MCP server', () => {
  test('lists its tools', async ({ request }) => {
    const response = await request.post('/mcp', rpc('tools/list'))
    const { result } = await response.json()

    expect(result.tools.map((tool: { name: string }) => tool.name)).toEqual([
      'list_categories',
      'search_components',
      'get_component',
    ])
  })

  test('searches and fetches a component', async ({ request }) => {
    const search = await request.post(
      '/mcp',
      rpc('tools/call', { name: 'search_components', arguments: { query: 'pricing' } }),
    )

    expect((await search.json()).result.content[0].text).toContain('marketing/pricing')

    const get = await request.post(
      '/mcp',
      rpc('tools/call', {
        name: 'get_component',
        arguments: { category: 'marketing', slug: 'pricing', variant: 1 },
      }),
    )

    const text = (await get.json()).result.content[0].text

    expect(text).toContain('```html')
    expect(text).toContain('@tailwindcss/browser@4')
  })

  test('answers notifications with 202, bad JSON with 400 and GET with 405', async ({
    request,
  }) => {
    const notification = await request.post('/mcp', {
      data: { jsonrpc: '2.0', method: 'notifications/initialized' },
    })

    expect(notification.status()).toBe(202)
    expect((await request.post('/mcp', { data: '{nope' })).status()).toBe(400)
    expect((await request.get('/mcp')).status()).toBe(405)
  })

  test('returns an error for an unknown tool', async ({ request }) => {
    const response = await request.post('/mcp', rpc('tools/call', { name: 'nope' }))

    expect((await response.json()).error.code).toBe(-32602)
  })
})
