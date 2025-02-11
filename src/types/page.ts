interface iPageDefault {
  title: string
  description: string
}

export type iCategoryPage = iPageDefault

export type iPageAbout = iPageDefault

export interface CollectionPage extends iPageDefault {
  slug: string
  seo: iPageDefault
}

/*
 * This has been taken from Next
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SegmentParams<T extends object = any> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>
    ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never }
    : T

export interface iPageProps {
  params?: Promise<SegmentParams>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: Promise<any>
}
