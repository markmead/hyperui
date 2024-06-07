'use client'

import { useEffect, useState } from 'react'

import { getArticleHeadings } from 'data-table-of-content'

export default function BlogTableContent() {
  const [contentHeadings, setContentHeadings] = useState([])

  useEffect(() => {
    const { articleHeadings } = getArticleHeadings()

    setContentHeadings(articleHeadings)
  }, [])

  const hasHeadings = contentHeadings.length > 0

  return hasHeadings ? (
    <details className="mt-4">
      <summary className="cursor-pointer text-sm font-medium text-gray-900">
        Table of Contents
      </summary>

      <div className="mt-1.5 rounded-md border border-gray-100 bg-gray-50 p-1.5">
        <HeadingsGroup headingGroup={contentHeadings} />
      </div>
    </details>
  ) : null
}

function HeadingsGroup({ headingGroup }) {
  return (
    <ul>
      {headingGroup.map((headingItem) => {
        const [headingParent, headingChildren] = headingItem

        const { headingId, textContent } = headingParent

        const hasChildren = !!headingChildren.length

        return (
          <li key={headingId}>
            <a href={`#${headingId}`}>{textContent}</a>

            {hasChildren && <HeadingsGroup groupItem={[...childItems]} />}
          </li>
        )
      })}
    </ul>
  )
}
