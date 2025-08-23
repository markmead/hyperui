import Hero from '@component/global/Hero'
import FavouritesList from '@component/FavouritesList'

export const metadata = {
  title: 'Tailwind CSS Favourites | HyperUI',
  description: 'Your personal collection of favourite Tailwind CSS components.',
  alternates: {
    canonical: '/favourites',
  },
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Favourite Tailwind CSS Components',
            description:
              'Your personal list of favourited Tailwind CSS components saved on HyperUI.',
            url: 'https://www.hyperui.dev/favourites',
          }),
        }}
      />

      <Hero title="Your Favourites" subtitle="Tailwind CSS components">
        Here you can view and manage all of your favourited components. Giving you quick access to
        the ones you love most.
      </Hero>

      <div id="mainContent" className="mx-auto max-w-screen-xl px-4 pb-8 lg:pb-12">
        <FavouritesList />
      </div>
    </>
  )
}
