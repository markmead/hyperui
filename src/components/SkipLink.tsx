function SkipLink() {
  return (
    <a
      href="#MainContent"
      className="absolute top-0 left-1/2 z-[100] -translate-x-1/2 -translate-y-full transition focus:translate-y-0"
    >
      <span className="block bg-black px-5 py-3 font-medium text-white">
        Skip to main content
      </span>
    </a>
  )
}

export default SkipLink
