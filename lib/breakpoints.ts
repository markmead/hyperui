type Breakpoint = {
  name: string
  emoji: string
  width: string
}

export const allBreakpoints: Array<Breakpoint> = [
  {
    name: 'Mobile',
    emoji: '📱',
    width: '340px',
  },
  {
    name: 'Small',
    emoji: '🐛',
    width: '640px',
  },
  {
    name: 'Medium',
    emoji: '🦭',
    width: '768px',
  },
  {
    name: 'Large',
    emoji: '🐴',
    width: '1024px',
  },
  {
    name: 'Full',
    emoji: '🌕',
    width: '100%',
  },
]
