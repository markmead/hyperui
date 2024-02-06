import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'

const rateLimitInstance = new Ratelimit({
  redis: kv,
  // We limit it to 10 requests from the same IP within 10 seconds
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

// Define which routes you want to rate limit
export const config = {
  matcher: '/',
}

export default async function middleware(nextRequest) {
  const requestIp = nextRequest.ip ?? '127.0.0.1'

  const { success: isSuccess } = await rateLimitInstance.limit(requestIp)

  return isSuccess
    ? NextResponse.next()
    : NextResponse.json(
        { error: 'You have hit the rate limit. Please try again in a few seconds.' },
        { status: 200 }
      )
}
