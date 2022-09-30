function SkipLink() {
  return (
    <a
      href="#MainContent"
      className="absolute top-0 z-[100] -translate-x-1/2 -translate-y-full left-1/2 focus:translate-y-0 transition"
    >
      <span className="block px-5 py-3 font-medium text-white bg-black">
        Skip to main content
      </span>
    </a>
  )
}

export default SkipLink
