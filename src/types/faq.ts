export interface FaqSchema {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '@context': string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  '@type': string
  mainEntity: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '@type': string
    name: string
    acceptedAnswer: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '@type': string
      text: string
    }
  }[]
}

export interface QuestionItem {
  question: string
  answer: string
}
