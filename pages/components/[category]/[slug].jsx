import { notFound } from 'next/navigation'

import { getComponent, getComponentPaths } from '@util/components'

import Ad from '@component/Ad'
import CollectionList from '@component/CollectionList'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
import Meta from '@component/Meta'

const mdxComponents = {
  CollectionList,
}

export async function getStaticPaths() {
  const componentPaths = await getComponentPaths()

  return {
    paths: componentPaths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  try {
    const { componentData, componentContent } = await getComponent(params)

    return {
      props: {
        componentData,
        componentContent,
      },
    }
  } catch {
    notFound()
  }
}

export default function Page({ componentData, componentContent }) {
  const componentsData = {
    componentContainer: {
      previewInner: componentData.container || '',
      previewHeight: componentData.wrapper || '',
    },
    componentsData: Object.entries(componentData.components).map(([componentId, componentItem]) => {
      return {
        id: componentId,
        title: componentItem.title,
        slug: componentData.slug,
        category: componentData.category,
        container: componentItem.container || '',
        wrapper: componentItem.wrapper || '',
        creator: componentItem.creator || '',
        dark: !!componentItem.dark,
        interactive: !!componentItem.interactive,
      }
    }),
  }

  const metaContent = {
    title: `${componentData.title} | HyperUI`,
    description: componentData.description,
  }

  return (
    <>
      <Meta metaContent={metaContent} />

      <Container classNames="py-8 lg:py-12 space-y-8 lg:space-y-12">
        <Ad adStyle="stickybox" />

        <div className="prose max-w-none">
          <MdxRemoteRender
            mdxSource={componentContent}
            mdxComponents={mdxComponents}
            mdxScope={componentsData}
          />
        </div>
      </Container>
    </>
  )
}
