export interface ComponentPreview {
  contributors: string[]
  dark: boolean
  /** Whether the component has a dark file, on its light and dark previews alike. */
  hasDark: boolean
  id: string
  index: number
  title: string
  description?: string | undefined
  plugins?: string[] | undefined
}
