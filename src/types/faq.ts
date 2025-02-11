export interface iFaqSchema {
  '@context': string
  '@type': string
  mainEntity: {
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }[]
}

export interface iFaqItem {
  question: string
  answer: string
}
