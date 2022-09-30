import Head from 'next/head'

import { Component } from '../../../interface/component'
import { FrontMatter } from '../../../interface/frontmatter'

import { componentSlugs } from '../../../lib/components'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import List from '../../../components/CollectionList'

const mdxComponents = {
  List,
}

type Props = {
  componentSlug: string
  componentSource: MDXRemoteProps
  componentFrontmatter: FrontMatter
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
    function ([componentId, componentData]: [string, Component]) {
      return {
        id: componentId,
        title: componentData.title,
        spacing: componentData.spacing ?? '',
        creator: componentData.creator ?? '',
        variants: componentData.variants
          ? Object.entries(componentData.variants).map(function ([
              variantId,
              variantData,
            ]: [string, Component]) {
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
        <div className="max-w-screen-xl px-4 py-12 mx-auto lg:pt-24">
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
    `data/components/${categorySlug}-${componentSlug}.mdx`
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
  const componentPaths = componentSlugs()

  return {
    paths: componentPaths,
    fallback: false,
  }
}

export default Component
