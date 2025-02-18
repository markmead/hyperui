interface PageDefault {
  title: string
  description: string
}

export type PageCategory = PageDefault

export type PageAbout = PageDefault

export interface CollectionPage extends PageDefault {
  slug: string
  seo: PageDefault
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

export interface PageProps {
  params?: Promise<SegmentParams>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: Promise<any>
}
