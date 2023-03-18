import { useRouter } from 'next/router'

type Props = {
  settingTitle: string
  settingDescription: string
  shouldRefresh?: boolean
}

function SettingTitle({
  settingTitle,
  settingDescription,
  shouldRefresh = false,
}: Props) {
  const { reload } = useRouter()

  return (
    <div>
      <div
        {...(shouldRefresh && {
          className: 'flex gap-2',
        })}
      >
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          {settingTitle}
        </p>

        {shouldRefresh && (
          <button
            onClick={() => reload()}
            className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800 hover:bg-blue-200 hover:text-blue-800 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
          >
            Requires Refresh
          </button>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
        {settingDescription}
      </p>
    </div>
  )
}

export default SettingTitle
