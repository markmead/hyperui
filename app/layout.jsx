import 'prismjs/themes/prism-okaidia.css'
import '@/styles/site.css'

import Footer from '@component/Footer'
import Header from '@component/Header'
import Banner from '@component/Banner'

export const metadata = {
  title: 'Free Open Source Tailwind CSS Components | HyperUI',
  description:
    'Free Tailwind CSS components that can be used in your next project.',
  openGraph: {
    title: 'Free Open Source Tailwind CSS Components | HyperUI',
    description:
      'Free Tailwind CSS components that can be used in your next project.',
    url: 'https://www.hyperui.dev/',
    siteName: 'HyperUI',
    type: 'website',
    image: 'https://www.hyperui.dev/og.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Open Source Tailwind CSS Components | HyperUI',
    description:
      'Free Tailwind CSS components that can be used in your next project.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html className="h-full scroll-smooth" lang="en" dir="ltr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>

      <body className="antialiased" id="AppBody">
        <Header />

        <main className="bg-white dark:bg-gray-900">{children}</main>

        <Footer />

        <Banner />
      </body>
    </html>
  )
}