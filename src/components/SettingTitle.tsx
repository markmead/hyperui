import { useRouter } from 'next/router'

type Props = {
  title: string
  description: string
  refresh?: boolean
}

function SettingTitle({ title, description, refresh = false }: Props) {
  const { reload } = useRouter()

  const reloadPage = () => reload()

  return (
    <div>
      <div
        {...(refresh && {
          className: 'flex gap-2',
        })}
      >
        <p className="text-sm font-medium">{title}</p>

        {refresh && (
          <button
            onClick={() => reloadPage()}
            className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700 hover:bg-blue-200 hover:text-blue-800"
          >
            Requires Refresh
          </button>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-700">{description}</p>
    </div>
  )
}

export default SettingTitle
