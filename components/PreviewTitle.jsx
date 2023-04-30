export default function PreviewTitle({ componentTitle, componentHash }) {
  return (
    <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
      <a href={`#${componentHash}`} className="group relative inline-block">
        <span
          aria-hidden="true"
          className="hidden group-hover:opacity-25 lg:absolute lg:inset-y-0 lg:-left-6 lg:block lg:opacity-0 lg:transition"
        >
          #
        </span>

        {componentTitle}
      </a>
    </h2>
  )
}
