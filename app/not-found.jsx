export async function generateMetadata() {
  return {
    title: '404 | HyperUI',
    description: "Uh-oh! It appears this page doesn't exist.",
  }
}

export default function Custom404() {
  return (
    <div className="grid h-[600px] place-content-center bg-white px-4 dark:bg-gray-900">
      <h1 className="uppercase tracking-widest text-gray-700 dark:text-gray-200">
        404 | Not Found
      </h1>
    </div>
  )
}
