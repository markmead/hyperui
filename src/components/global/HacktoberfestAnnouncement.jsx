import Link from 'next/link'

export default function HacktoberfestAnnouncement() {
  return (
    <aside
      className="-mt-px border-y-1 border-violet-500 bg-violet-100 p-4 text-center text-violet-700"
      aria-label="Hacktoberfest announcement"
    >
      <strong>🎉 Happy Hacktoberfest!</strong> Before making a contribution, please read the{' '}
      <Link href="/blog/how-to-contribute" className="font-medium underline hover:text-violet-900">
        contributing guide
      </Link>{' '}
      to get started.
    </aside>
  )
}
