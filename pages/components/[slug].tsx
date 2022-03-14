import type { NextPage } from 'next'

import Head from 'next/head'

import { Component } from '../../interface/component'
import { FrontMatter } from '../../interface/frontmatter'

import { componentSlugs } from '../../lib/components'

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import List from '../../components/collection/list'

const components = {
  List,
}

type Props = {
  source: any
  name: string
  frontMatter: FrontMatter
}

const Component: NextPage<Props> = ({ source, name, frontMatter }) => {
  const { seo, spacing, height, components: items } = frontMatter

  const componentsArray: Array<Component> = Object.entries(items).map(
    ([key, value]): Component => ({
      id: key,
      title: value.title,
      spacing: value.spacing ?? false,
    })
  )

  const data = {
    name,
    spacing,
    height,
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
  const source = fs.readFileSync(`data/components/${slug}.mdx`)

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

export async function getStaticPaths() {
  const paths = componentSlugs()

  return {
    paths,
    fallback: false,
  }
}

export default Component
