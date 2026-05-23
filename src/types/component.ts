export interface ComponentPreview {
  contributors: string[]
  dark: boolean
  id: string
  index: number
  title: string
  description?: string | undefined
  hyperux?:
    | {
        href: string
        title?: string | undefined
      }
    | undefined
  plugins?: string[] | undefined
}
