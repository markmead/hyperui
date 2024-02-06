export async function generateMetadata() {
  return {
    title: 'Blocked | HyperUI',
    description: 'Uh-oh! You have hit the rate limit.',
  }
}

export default function page() {
  return (
    <div className="grid h-[600px] place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-700">Rate Limit</h1>
    </div>
  )
}
