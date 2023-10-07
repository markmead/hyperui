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
  /**
   * Lists of ux 404 error messages
  */
  const errorMessages = [
    "Oops! It looks like you've entered an incorrect URL. Double-check your web address and try again. 🌐",
    "This page doesn't exist. You might have mistyped the URL. Please verify and try once more. 🔍",
    "Looks like you're lost in cyberspace. Please recheck the URL and continue your journey. 🚀",
    "This URL seems to be a little off course. Please review it and try another. 🌄 #WrongWay",
    "Like typing the wrong address, this URL won't connect. Review it and try the right one. ☎️",
    "You've stumbled upon a URL that doesn't lead anywhere. Please ensure it's correct and continue your digital journey. 🚴",
    "Sorry, we couldn't find the page you're looking for. Please validate the URL, and we'll assist you in your search. 🧳"
  ];
  return (
    <section className="h-screen px-8 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold">404!</h1>
        <p className="my-2 text-lg break-words"> {errorMessages[Math.floor(Math.random() * errorMessages.length)]} </p>
      </div>
    </section>
  )
}