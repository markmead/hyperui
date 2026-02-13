export function calculateReadingTime(text: string): number {
  const WORDS_PER_MINUTE = 200

  const words = text.trim().split(/\s+/).length

  return Math.ceil(words / WORDS_PER_MINUTE)
}
