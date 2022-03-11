import type { NextPage } from 'next'

import Head from 'next/head'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import { componentFilePaths, COMPONENTS_PATH } from '../../utils/mdx'

import List from '../../components/list'
import { Component } from '../../interface/component'

const components = {
  List,
}

interface FrontMatterSEO {
  title: string
  description: string
}

interface FrontMatterComponents {
  title: string
  spacing?: string
}

interface FrontMatter {
  title: string
  emoji: string
  spacing: string
  seo: FrontMatterSEO
  components: FrontMatterComponents
}

type Props = {
  source: any
  name: string
  frontMatter: FrontMatter
}

type Params = {
  params: {
    slug: string
  }
}

const Component: NextPage<Props> = ({ source, name, frontMatter }) => {
  const componentsArray: Array<Component> = Object.entries(
    frontMatter.components
  ).map(
    ([key, value]): Component => ({
      id: key,
      title: value.title,
      spacing: value.spacing ?? false,
    })
  )

  const data = {
    name,
    spacing: frontMatter.spacing,
    examples: componentsArray,
  }

  return (
    <>
      <Head>
        <title>
          {frontMatter.seo.title} | Free Open Source Tailwind CSS Components |
          HyperUI
        </title>

        <meta
          name="description"
          key="description"
          content={frontMatter.seo.description}
        />
      </Head>

      <section>
        <div className="max-w-screen-xl px-4 pt-24 pb-16 mx-auto">
          <div className="prose">
            <MDXRemote {...source} components={components} scope={data} />
          </div>
        </div>
      </section>
    </>
  )
}

export async function getStaticProps({ params: { slug } }: Params) {
  const postFilePath = path.join(COMPONENTS_PATH, `${slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      name: slug,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = componentFilePaths
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export default Component
