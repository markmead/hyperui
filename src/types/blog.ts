export interface BlogSchema {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '@context': string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '@type': string
  headline: string
  image: string
  datePublished: string
}

export interface BlogItem {
  title: string
  slug: string
  emoji: string
  date: string
  tag?: string
  description: string
}
