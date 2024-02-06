export async function generateMetadata() {
  return {
    title: 'Blocked | HyperUI',
    description: 'Uh-oh! You have hit the rate limit.',
  }
}

export default function page() {
  return (
    <div className="grid h-[600px] place-content-center bg-white px-4">
      <div className="text-center">
        <h1 className="uppercase tracking-widest text-gray-900">Blocked | Rate Limit Exceeded</h1>

        <p className="mt-4 text-gray-700">Please try again in a few minutes.</p>
      </div>
    </div>
  )
}
