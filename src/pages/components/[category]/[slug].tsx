import Head from 'next/head'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { Component, ComponentVariant } from '@/interface/component'
import { getComponentPaths } from '@/lib/getComponents'

import List from '@/components/CollectionList'

const mdxComponents = {
  List,
}

type CategoryData = {
  title: string
  emoji: string
  spacing: string
  seo: {
    title: string
    description: string
  }
  components: {
    title: string
    spacing?: string
  }
}

type ComponentData = Omit<Component, 'slug'>

type Props = {
  componentSlug: string
  componentSource: MDXRemoteProps
  componentFrontmatter: CategoryData
}

function Component({
  componentSlug,
  componentSource,
  componentFrontmatter,
}: Props) {
  const {
    seo: componentSeo,
    spacing: componentSpacing,
    components: componentsData,
  } = componentFrontmatter

  const componentsArray: Array<Component> = Object.entries(componentsData).map(
    // @ts-expect-error
    function ([componentId, componentData]: [string, ComponentData]) {
      return {
        id: componentId,
        title: componentData.title,
        spacing: componentData.spacing ?? '',
        creator: componentData.creator ?? '',
        variants: componentData.variants
          ? Object.entries(componentData.variants).map(function ([
              variantId,
              variantData,
            ]: [string, ComponentVariant]) {
              return {
                id: variantId,
                title: variantData.title,
              }
            })
          : [],
      }
    }
  )

  const componentData = {
    componentSlug,
    componentSpacing,
    componentsArray,
  }

  return (
    <>
      <Head>
        <title>Free Tailwind CSS {componentSeo.title} | HyperUI</title>

        <meta
          name="description"
          key="description"
          content={componentSeo.description}
        />
      </Head>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-12 lg:pt-24">
          <div className="prose max-w-none">
            <MDXRemote
              {...componentSource}
              components={mdxComponents}
              scope={componentData}
            />
          </div>
        </div>
      </section>
    </>
  )
}

type Params = {
  params: {
    category: string
    slug: string
  }
}

export async function getStaticProps({ params: { category, slug } }: Params) {
  const categorySlug = category
  const componentSlug = slug

  const componentSource = fs.readFileSync(
    `./src/data/components/${categorySlug}-${componentSlug}.mdx`
  )

  const { content: componentContent, data: componentData } =
    matter(componentSource)

  const mdxSource = await serialize(componentContent, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
    scope: componentData,
  })

  return {
    props: {
      componentSource: mdxSource,
      componentFrontmatter: componentData,
      componentSlug,
    },
  }
}

export async function getStaticPaths() {
  const componentPaths = getComponentPaths()

  return {
    paths: componentPaths,
    fallback: false,
  }
}

export default Component
