import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: kv,
  // We limit it to 5 requests from the same IP within 10 seconds
  limiter: Ratelimit.slidingWindow(5, '10 s'),
})

// Define which routes you want to rate limit
export const config = {
  matcher: '/',
}

export default async function middleware(nextRequest) {
  const requestIp = nextRequest.ip ?? '127.0.0.1'

  const { success: isSuccess } = await ratelimit.limit(requestIp)

  return isSuccess
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/blocked', nextRequest.url))
}
