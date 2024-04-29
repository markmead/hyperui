import Head from 'next/head'
import { notFound } from 'next/navigation'

import { getPage, getPagePaths } from '@util/pages'

import Container from '@component/Container'
import FaqList from '@component/FaqList'
import MdxRemoteRender from '@component/MdxRemoteRender'

const mdxComponents = {
  FaqList,
}

export async function getStaticPaths() {
  const pagePaths = await getPagePaths()

  return {
    paths: pagePaths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  try {
    const { pageData, pageContent } = await getPage(params)

    return {
      props: {
        pageData,
        pageContent,
      },
    }
  } catch {
    notFound()
  }
}

export default function Page({ pageData, pageContent }) {
  return (
    <>
      <Head>
        <title>{pageData.title} | HyperUI</title>
        <meta name="description" content={pageData.description} key="description" />
        <meta property="og:title" content={`${pageData.title} | HyperUI`} key="og:title" />
        <meta property="og:description" content={pageData.description} key="og:description" />
        <meta name="twitter:title" content={`${pageData.title} | HyperUI`} key="twitter:title" />
        <meta name="twitter:description" content={pageData.description} key="twitter:description" />
      </Head>

      <Container classNames="py-8 lg:py-12">
        <article className="prose mx-auto">
          <h1>{pageData.title}</h1>

          <MdxRemoteRender mdxSource={pageContent} mdxComponents={mdxComponents} />
        </article>
      </Container>
    </>
  )
}
