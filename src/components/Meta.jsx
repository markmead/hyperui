import Head from 'next/head'

export default function Meta({ metaContent }) {
  return (
    <Head>
      <title>{metaContent.title}</title>
      <meta name="description" content={metaContent.description} key="description" />
      <meta property="og:title" content={metaContent.title} key="og:title" />
      <meta property="og:description" content={metaContent.description} key="og:description" />
      <meta property="og:type" content="website" key="og:type" />
      <meta property="og:url" content="https://www.hyperui.dev/" key="og:url" />
      <meta property="og:site_name" content="HyperUI" key="og:site_name" />
      <meta property="og:image" content="https://www.hyperui.dev/og.jpg" key="og:image" />
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:title" content={metaContent.title} key="twitter:title" />
      <meta
        name="twitter:description"
        content={metaContent.description}
        key="twitter:description"
      />
    </Head>
  )
}
