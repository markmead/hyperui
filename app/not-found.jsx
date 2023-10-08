import { ogMeta, twitterMeta } from '@data/metadata'


export async function generateMetadata() {
  const description = `Uh-oh! It appears that this page doesn't exist!`
  return {
    title: `404 Page Doesn't Exist | HyperUI`,
    description: description,
    openGraph: {
      title: `404 Page Doesn't Exist | HyperUI`,
      description: description,
      ...ogMeta,
    },
    twitter: {
      title: `404 Page Doesn't Exist | HyperUI`,
      description: description,
      ...twitterMeta,
    },
  }
}

export default function Custom404() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <h1 className="tracking-widest text-gray-500 text-center uppercase text-3xl">404 | URL Not Found!</h1>
    </div>
  )
}