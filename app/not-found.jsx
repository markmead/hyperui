import { ogMeta, twitterMeta } from '@data/metadata'


export async function generateMetadata() {
  const description = `Uh-oh! It appears you've reached a digital crossroads, and the page you were seeking has gone missing. Don't worry, though; we're here to assist you in navigating back to our main content or helping you find the information you were looking for. Feel free to explore our site, or use the search bar to discover what you need. We apologize for any inconvenience and appreciate your patience.`
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
      <h1 className="tracking-widest text-gray-500 uppercase text-3xl">404 | URL Not Found!</h1>
   </div>
}