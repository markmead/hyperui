import { useRouter } from 'next/router'

type Props = {
  settingTitle: string
  settingDescription: string
  shouldRefresh?: boolean
  experimental?: boolean
}

function SettingTitle({
  settingTitle,
  settingDescription,
  shouldRefresh = false,
  experimental = false,
}: Props) {
  const { reload } = useRouter()

  return (
    <div>
      <div
        {...((shouldRefresh || experimental) && {
          className: 'flex gap-2',
        })}
      >
        <p className="text-sm font-medium">{settingTitle}</p>

        {experimental && (
          <span className="inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs text-yellow-700">
            Experimental
          </span>
        )}

        {shouldRefresh && (
          <button
            onClick={() => reload()}
            className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700 hover:bg-blue-200 hover:text-blue-800"
          >
            Requires Refresh
          </button>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-700">{settingDescription}</p>
    </div>
  )
}

export default SettingTitle
