import { join } from 'node:path'
import { promises as fs } from 'node:fs'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'

import { iCollectionItem, iComponentItem } from '@type/component'
import { iPageProps } from '@type/page'
import { iPageMeta } from '@type/site'

import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'
import CollectionList from '@component/CollectionList'
import Ad from '@component/Ad'

interface iComponentItemExtended extends iComponentItem {
  wrapper: string
}

interface iCollectionData extends iCollectionItem {
  slug: string
  components: iComponentItemExtended[]
}

interface iComponentData {
  componentContainer: {
    previewInner: string
    previewHeight: string
  }
  componentsData: Omit<iCollectionItem, 'seo' | 'emoji' | 'tag' | 'components'>[]
}

interface iPageParams {
  category: string
  collection: string
}

interface iPageData {
  collectionData: Partial<iCollectionData>
  collectionContent: MDXRemoteSerializeResult
}

const mdxComponents = {
  CollectionList,
}

const componentsDirectory: string = join(process.cwd(), '/src/data/components')

export async function generateMetadata(props: iPageProps): Promise<iPageMeta> {
  const params: Awaited<iPageParams> = await props.params

  const { collectionData }: Awaited<{ collectionData: Partial<iCollectionData> }> =
    await getCollection(params)

  return {
    title: `Tailwind CSS ${collectionData.seo.title} | HyperUI`,
    description: collectionData.seo.description,
    alternates: {
      canonical: `/components/${params.category}/${params.collection}`,
    },
  }
}

async function getCollection(params: iPageParams): Promise<iPageData> {
  try {
    const componentPath: string = join(
      componentsDirectory,
      `${params.category}-${params.collection}.mdx`
    )
    const componentItem: Awaited<string> = await fs.readFile(componentPath, 'utf-8')

    const mdxSource: Awaited<MDXRemoteSerializeResult> = await serialize(componentItem, {
      parseFrontmatter: true,
    })

    return {
      collectionData: {
        ...mdxSource.frontmatter,
        slug: params.collection,
      },
      collectionContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props: iPageProps) {
  const params: Awaited<iPageParams> = await props.params

  const { collectionData, collectionContent } = await getCollection(params)

  const componentsData: iComponentData = {
    componentContainer: {
      previewInner: collectionData.container || '',
      previewHeight: collectionData.wrapper || '',
    },
    componentsData: Object.entries(collectionData.components).map(
      ([componentId, componentItem]) => {
        return {
          id: componentId,
          title: componentItem.title,
          slug: collectionData.slug,
          category: collectionData.category,
          container: componentItem.container || '',
          wrapper: componentItem.wrapper || '',
          creator: componentItem.creator || '',
          dark: !!componentItem.dark,
          interactive: !!componentItem.interactive,
        }
      }
    ),
  }

  return (
    <Container id="mainContent" classNames="py-8 lg:py-12 space-y-8">
      <Ad />

      <div className="prose max-w-none">
        <MdxRemoteRender
          mdxSource={collectionContent}
          mdxComponents={mdxComponents}
          mdxScope={componentsData}
        />
      </div>
    </Container>
  )
}
