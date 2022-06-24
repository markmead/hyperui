import type { NextPage } from 'next'

import Head from 'next/head'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ToastContext from '../../../context/toast'

import { Component } from '../../../interface/component'
import { FrontMatter } from '../../../interface/frontmatter'

import { componentSlugs } from '../../../lib/components'

import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import List from '../../../components/collection/list'

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
      tags: value.tags ?? [],
    })
  )

  const data = {
    name,
    spacing: spacing,
    examples: componentsArray,
  }

  return (
    <ToastContext.Provider value={toast}>
      <>
        <Head>
          <title>Free Open Source Tailwind CSS {seo.title} | HyperUI</title>

          <meta
            name="description"
            key="description"
            content={seo.description}
          />
        </Head>

        <section>
          <div className="max-w-screen-xl px-4 pt-24 pb-16 mx-auto">
            <div className="prose max-w-none">
              <MDXRemote {...source} components={components} scope={data} />
            </div>
          </div>
        </section>

        <ToastContainer
          className="text-center"
          closeButton={false}
          draggable={false}
          hideProgressBar
          limit={1}
          position="bottom-center"
          theme="dark"
        />
      </>
    </ToastContext.Provider>
  )
}

type Params = {
  params: {
    category: string
    slug: string
  }
}

export async function getStaticProps({ params: { category, slug } }: Params) {
  const source = fs.readFileSync(`data/components/${category}-${slug}.mdx`)

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
