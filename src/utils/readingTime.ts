export function calculateReadingTime(text: string): number {
  const WORDS_PER_MINUTE = 200

  const trimmed = text.trim()

  if (trimmed.length === 0) {
    return 0
  }

  const words = trimmed.split(/\s+/).length

  return Math.ceil(words / WORDS_PER_MINUTE)
}
