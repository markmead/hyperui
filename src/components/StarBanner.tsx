import { useEffect, useState } from 'react'

import { useAppSelector, useAppDispatch } from '@/services/hooks/useStore'
import { toggleBanner, siteState } from '@/services/store/slices/site'

import IconClose from '@/components/IconClose'

export default function StarBanner() {
  const dispatch = useAppDispatch()
  const { banner } = useAppSelector(siteState)

  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => setShowBanner(banner), [banner])

  return (
    <>
      {showBanner && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-6">
          <div className="mx-auto max-w-xl">
            <div className="flex overflow-hidden rounded-lg shadow-lg">
              <a
                href="https://github.com/markmead/hyperui"
                rel="noreferrer"
                target="_blank"
                className="flex-1 bg-gray-900 p-3 text-white transition hover:text-white/75 dark:bg-gray-800"
              >
                <span className="text-sm font-medium">
                  Enjoy HyperUI? Give it a star on GitHub
                </span>

                <span className="ms-1.5 text-sm">⭐️</span>
              </a>

              <button
                onClick={() => dispatch(toggleBanner())}
                className="shrink-0 border-s border-white/10 bg-gray-900 p-3 text-white transition hover:text-white/75 dark:bg-gray-800"
              >
                <IconClose />

                <span className="sr-only">Banner</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
