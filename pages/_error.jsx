export default function Error({ statusCode }) {
  return (
    <div className="grid h-[600px] place-content-center bg-white px-4">
      <h1 className="uppercase tracking-widest text-gray-700">{statusCode} | Uh-oh!</h1>
    </div>
  )
}
