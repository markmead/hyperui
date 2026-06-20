export type Status = 'beta' | 'coming-soon' | 'fresh' | 'stable' | 'updated'

const STATUS_MAP: Record<Status, { color: string; label: string }> = {
  beta: {
    color: 'bg-amber-500',
    label: 'Beta',
  },
  'coming-soon': {
    color: 'bg-gray-400',
    label: 'Coming Soon',
  },
  fresh: {
    color: 'bg-green-600',
    label: 'New',
  },
  stable: {
    color: 'bg-green-600',
    label: 'Stable',
  },
  updated: {
    color: 'bg-blue-500',
    label: 'Updated',
  },
}

export const getStatus = (status: Status): { color: string; label: string } => {
  const statusEntry = STATUS_MAP[status]

  if (!statusEntry) {
    throw new Error(`Unknown status: "${status}"`)
  }

  return statusEntry
}
