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
      <Container classNames="py-8 lg:py-12">
        <article className="prose mx-auto">
          <h1>{pageData.title}</h1>

          <MdxRemoteRender mdxSource={pageContent} mdxComponents={mdxComponents} />
        </article>
      </Container>
    </>
  )
}
