export type Status = 'beta' | 'coming-soon' | 'fresh' | 'stable' | 'updated'

const STATUS_MAP: Record<Status, { color: string; label: string }> = {
  beta: { color: 'bg-amber-500', label: 'Beta' },
  'coming-soon': { color: 'bg-gray-400', label: 'Coming soon' },
  fresh: { color: 'bg-green-600', label: 'New' },
  stable: { color: 'bg-blue-500', label: 'Stable' },
  updated: { color: 'bg-blue-500', label: 'Updated' },
}

export function getStatusColor(status: Status): string {
  return STATUS_MAP[status].color
}

export function getStatusLabel(status: Status): string {
  return STATUS_MAP[status].label
}
