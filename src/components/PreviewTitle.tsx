interface Props {
  componentHash: string
  componentTitle: string
}

export default function PreviewTitle({ componentHash, componentTitle }: Props) {
  return (
    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
      <a href={`#${componentHash}`} className="group relative inline-block">
        <span
          aria-hidden="true"
          className="hidden text-xl group-hover:opacity-40 group-focus:opacity-40 lg:absolute lg:top-1/2 lg:-left-4 lg:block lg:-translate-y-1/2 lg:opacity-0 lg:transition"
        >
          #
        </span>

        {componentTitle}
      </a>
    </h2>
  )
}
