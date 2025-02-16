import { PageMeta } from '@type/site'

export const metadata: Omit<PageMeta, 'alternates'> = {
  title: '404 | HyperUI',
  description: "Uh-oh! It appears this page doesn't exist.",
}

export default function Custom404() {
  return (
    <div className="grid h-[600px] place-content-center bg-white px-4">
      <h1 className="tracking-widest text-gray-700 uppercase">404 | Not Found</h1>
    </div>
  )
}
