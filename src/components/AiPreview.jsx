'use client'

import { useState } from 'react'

import { componentBreakpoints } from '@data/breakpoints'

import PreviewCode from '@component/PreviewCode'
import PreviewCopy from '@component/PreviewCopy'
import PreviewIframe from '@component/PreviewIframe'
import PreviewView from '@component/PreviewView'
import PreviewBreakpoint from '@component/PreviewBreakpoint'

export default function AiPreview({ previewCode, previewHtml }) {
  const [showPreview, setShowPreview] = useState(true)
  const [previewWidth, setPreviewWidth] = useState('100%')

  return (
    <div className="space-y-4">
      <div className="lg:flex lg:items-end">
        {previewCode && (
          <div className="flex gap-4">
            <PreviewView handleSetShowPreview={setShowPreview} showPreview={showPreview} />

            <PreviewCopy componentCode={previewCode} />
          </div>
        )}

        <div className="hidden lg:flex lg:flex-1 lg:items-end lg:justify-end lg:gap-4">
          {componentBreakpoints.map(
            ({ name: breakpointName, emoji: breakpointEmoji, width: breakpointWidth }) => (
              <PreviewBreakpoint
                key={breakpointName}
                breakpointText={breakpointName}
                breakpointEmoji={breakpointEmoji}
                breakpointWidth={breakpointWidth}
                handleSetPreviewWidth={setPreviewWidth}
                breakpointActive={previewWidth === breakpointWidth}
              />
            )
          )}
        </div>
      </div>

      <div className="relative">
        <div>
          <PreviewIframe
            showPreview={showPreview}
            previewWidth={previewWidth}
            componentHtml={previewHtml}
            componentTitle="AI Component"
          />

          <PreviewCode showPreview={showPreview} componentCode={previewCode} />
        </div>
      </div>
    </div>
  )
}
