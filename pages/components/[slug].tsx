import type { NextPage } from 'next'

import Head from 'next/head'

import { Component } from '../../interface/component'
import { FrontMatter } from '../../interface/frontmatter'

import { componentFilePaths, COMPONENTS_PATH } from '../../utils/mdx'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import List from '../../components/list'

const components = {
  List,
}

type Props = {
  source: any
  name: string
  frontMatter: FrontMatter
}

const Component: NextPage<Props> = ({ source, name, frontMatter }) => {
  const { seo, spacing, components: items } = frontMatter

  const componentsArray: Array<Component> = Object.entries(items).map(
    ([key, value]): Component => ({
      id: key,
      title: value.title,
      spacing: value.spacing ?? false,
    })
  )

  const data = {
    name,
    spacing: spacing,
    examples: componentsArray,
  }

  return (
    <>
      <Head>
        <title>
          {seo.title} | Free Open Source Tailwind CSS Components | HyperUI
        </title>

        <meta name="description" key="description" content={seo.description} />
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

type Params = {
  params: {
    slug: string
  }
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
