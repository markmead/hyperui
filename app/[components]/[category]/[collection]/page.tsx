import { join } from 'node:path'
import { promises as fs } from 'node:fs'

import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { notFound } from 'next/navigation'
import { serialize } from 'next-mdx-remote/serialize'

import { CollectionItem, ComponentItem } from '@type/component'
import { PageMeta } from '@type/site'
import { PageProps } from '@type/page'
import Ad from '@component/Ad'
import CollectionList from '@component/CollectionList'
import Container from '@component/Container'
import MdxRemoteRender from '@component/MdxRemoteRender'

interface ComponentItemExtended extends ComponentItem {
  wrapper: string
}

interface CollectionData extends CollectionItem {
  slug: string
  components: ComponentItemExtended[]
}

interface ComponentData {
  componentContainer: {
    previewInner: string
    previewHeight: string
  }
  componentsData: Omit<CollectionItem, 'seo' | 'emoji' | 'tag' | 'components'>[]
}

interface PageParams {
  category: string
  collection: string
}

interface PageData {
  collectionData: CollectionData
  collectionContent: MDXRemoteSerializeResult
}

const mdxComponents = {
  CollectionList,
}

const componentsDirectory: string = join(process.cwd(), '/src/data/components')

export async function generateMetadata(props: PageProps): Promise<PageMeta> {
  const params: Awaited<PageParams> = await props.params

  const { collectionData }: Awaited<{ collectionData: CollectionData }> =
    await getCollection(params)

  return {
    title: `Tailwind CSS ${collectionData.seo.title} | HyperUI`,
    description: collectionData.seo.description,
    alternates: {
      canonical: `/components/${params.category}/${params.collection}`,
    },
  }
}

async function getCollection(params: PageParams): Promise<PageData> {
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
        ...(mdxSource.frontmatter as Omit<CollectionData, 'slug'>),
        slug: params.collection,
      },
      collectionContent: mdxSource,
    }
  } catch {
    notFound()
  }
}

export default async function Page(props: PageProps) {
  const params: Awaited<PageParams> = await props.params

  const { collectionData, collectionContent } = await getCollection(params)

  const componentsData: ComponentData = {
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
          dark: Boolean(componentItem.dark),
          interactive: Boolean(componentItem.interactive),
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
