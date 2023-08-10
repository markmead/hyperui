import Container from '@component/Container'

export const metadata = {
  title: 'Acknowledgements | HyperUI',
  description: 'Quick mention to some of the tools that helped build HyperUI.',
  openGraph: {
    title: 'Acknowledgements | HyperUI',
    description:
      'Quick mention to some of the tools that helped build HyperUI.',
    url: 'https://www.hyperui.dev/',
    siteName: 'HyperUI',
    type: 'website',
    image: 'https://www.hyperui.dev/og.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acknowledgements | HyperUI',
    description:
      'Quick mention to some of the tools that helped build HyperUI.',
  },
}

export default async function Page() {
  const pageLinks = [
    {
      name: 'PrismJS',
      url: 'https://github.com/PrismJS/prism',
    },
    {
      name: 'React Use',
      url: 'https://github.com/streamich/react-use',
    },
    {
      name: 'Next MDX Remote',
      url: 'https://github.com/hashicorp/next-mdx-remote',
    },
    {
      name: 'Prettier (TailwindCSS)',
      url: 'https://github.com/tailwindlabs/prettier-plugin-tailwindcss',
    },
    {
      name: 'React Intersection Observer',
      url: 'https://github.com/thebuilder/react-intersection-observer',
    },
  ]

  return (
    <>
      <Container classNames="py-8 lg:py-12">
        <article class="prose">
          <h1>Acknowledgements</h1>

          <p>
            These are not all of the tools used to make HyperUI, but these are
            the ones that I think deserve a mention as they could easily fly
            under the radar, but in fact are very important to the project.
          </p>

          <ul>
            {pageLinks.map((pageLink) => (
              <li>
                <a href={pageLink.url} target="_blank" rel="noreferrer">
                  {pageLink.name}
                </a>
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </>
  )
}
