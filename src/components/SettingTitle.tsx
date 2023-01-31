type Props = {
  title: string
  description: string
  refresh?: boolean
}

function SettingTitle({ title, description, refresh = false }: Props) {
  return (
    <div>
      <div
        {...(refresh && {
          className: 'flex gap-2',
        })}
      >
        <p className="text-sm font-medium">{title}</p>

        {refresh && (
          <span className="inline-block rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700">
            Requires Refresh
          </span>
        )}
      </div>

      <p className="mt-1 text-xs text-gray-700">{description}</p>
    </div>
  )
}

export default SettingTitle
