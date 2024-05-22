import { sendGAEvent } from '@next/third-parties/google'

export default function PreviewTitle({ componentTitle, componentHash }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
      <a
        href={`#${componentHash}`}
        className="group relative inline-block"
        onClick={() => sendGAEvent({ event: 'component_title_clicked' })}
      >
        <span
          aria-hidden="true"
          className="hidden group-hover:opacity-25 group-focus:opacity-25 lg:absolute lg:inset-y-0 lg:-left-6 lg:block lg:opacity-0 lg:transition"
        >
          #
        </span>

        {componentTitle}
      </a>
    </h2>
  )
}
