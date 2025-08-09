export default function PreviewTitle({ componentTitle, componentHash }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
      <a
        href={`#${componentHash}`}
        className="group relative inline-block focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none"
      >
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
