/**
 * Skeleton thumbnails for collection cards: a few grey shapes that show what a
 * collection looks like without loading an image. Each collection maps to a
 * drawing in `SKELETON_BY_SLUG`, and drawings are built from the shapes below
 * on a 320 by 128 canvas.
 */

export const SKELETON_WIDTH = 320
export const SKELETON_HEIGHT = 128

export type Tone = 'surface' | 'soft' | 'base' | 'strong' | 'dark' | 'ink' | 'inkline'

export type Shape = {
  kind: 'rect' | 'circle' | 'ring'
  tone: Tone
  x: number
  y: number
  w: number
  h: number
  r: number
  dashed?: boolean
}

// Written out in full so Tailwind sees every class.
export const TONE_CLASS: Record<Tone, string> = {
  surface: 'fill-white stroke-gray-200',
  soft: 'fill-gray-100',
  base: 'fill-gray-200',
  strong: 'fill-gray-300',
  dark: 'fill-gray-400',
  ink: 'fill-gray-900',
  inkline: 'fill-gray-600',
}

export const RING_CLASS = 'fill-none stroke-gray-300 stroke-[4]'

type Drawing = Shape[]

const box = (x: number, y: number, w: number, h: number, r = 6, tone: Tone = 'surface'): Shape => ({
  kind: 'rect',
  tone,
  x,
  y,
  w,
  h,
  r,
})

const dashedBox = (x: number, y: number, w: number, h: number, r = 8): Shape => ({
  ...box(x, y, w, h, r),
  dashed: true,
})

// A rounded line, used for text and rules.
const bar = (x: number, y: number, w: number, h = 6, tone: Tone = 'base'): Shape => ({
  kind: 'rect',
  tone,
  x,
  y,
  w,
  h,
  r: h / 2,
})

const pill = (x: number, y: number, w: number, h: number, tone: Tone = 'base'): Shape =>
  bar(x, y, w, h, tone)

const dot = (cx: number, cy: number, radius: number, tone: Tone = 'base'): Shape => ({
  kind: 'circle',
  tone,
  x: cx,
  y: cy,
  w: radius * 2,
  h: radius * 2,
  r: radius,
})

const ring = (cx: number, cy: number, radius: number): Shape => ({
  kind: 'ring',
  tone: 'strong',
  x: cx,
  y: cy,
  w: radius * 2,
  h: radius * 2,
  r: radius,
})

// Faint page content, so a header or footer reads as part of a page.
const pageLines = (y: number): Drawing => [
  bar(24, y, 150, 8, 'soft'),
  bar(24, y + 16, 240, 5, 'soft'),
  bar(24, y + 28, 200, 5, 'soft'),
]

const accordion: Drawing = [
  box(40, 12, 240, 52),
  bar(56, 24, 100, 7, 'dark'),
  dot(262, 28, 4, 'strong'),
  bar(56, 42, 180, 5),
  bar(56, 52, 130, 5),
  box(40, 72, 240, 22),
  bar(56, 80, 80, 6, 'dark'),
  dot(262, 83, 4, 'strong'),
  box(40, 102, 240, 22),
  bar(56, 110, 110, 6, 'dark'),
  dot(262, 113, 4, 'strong'),
]

const appShell: Drawing = [
  box(24, 12, 272, 104, 8),
  box(24, 12, 64, 104, 8, 'soft'),
  bar(36, 26, 36, 6, 'dark'),
  bar(36, 44, 40, 5, 'strong'),
  bar(36, 58, 32, 5, 'strong'),
  bar(36, 72, 38, 5, 'strong'),
  bar(100, 24, 80, 7, 'dark'),
  dot(276, 28, 7, 'strong'),
  box(100, 44, 92, 30, 5),
  box(200, 44, 84, 30, 5),
  box(100, 82, 184, 26, 5),
]

const avatars: Drawing = [
  dot(100, 64, 24, 'strong'),
  dot(140, 64, 24, 'base'),
  dot(180, 64, 24, 'dark'),
  dot(220, 64, 24, 'base'),
]

const badges: Drawing = [
  pill(40, 34, 56, 20, 'base'),
  pill(104, 34, 44, 20, 'strong'),
  pill(156, 34, 64, 20, 'base'),
  pill(228, 34, 48, 20, 'dark'),
  pill(56, 72, 48, 20, 'strong'),
  pill(112, 72, 72, 20, 'base'),
  pill(192, 72, 52, 20, 'strong'),
]

const breadcrumbs: Drawing = [
  bar(36, 60, 36, 8, 'strong'),
  bar(82, 62, 5, 4, 'base'),
  bar(96, 60, 52, 8, 'strong'),
  bar(158, 62, 5, 4, 'base'),
  bar(172, 60, 42, 8, 'strong'),
  bar(224, 62, 5, 4, 'base'),
  bar(238, 60, 48, 8, 'dark'),
]

const buttons: Drawing = [
  pill(40, 40, 72, 28, 'dark'),
  box(124, 40, 72, 28, 14),
  pill(208, 40, 72, 28, 'base'),
  pill(76, 80, 80, 28, 'strong'),
  box(164, 80, 80, 28, 14),
]

const buttonGroup: Drawing = [
  box(60, 48, 200, 32, 8),
  bar(126, 48, 1.5, 32, 'strong'),
  bar(192, 48, 1.5, 32, 'strong'),
  bar(80, 61, 28, 6, 'dark'),
  bar(144, 61, 32, 6, 'strong'),
  bar(212, 61, 28, 6, 'strong'),
]

const cardGrid: Drawing = [0, 1, 2].flatMap((i) => [
  box(24 + i * 92, 14, 84, 100),
  box(30 + i * 92, 20, 72, 44, 4, 'base'),
  bar(30 + i * 92, 74, 52, 7, 'dark'),
  bar(30 + i * 92, 88, 68, 5),
  bar(30 + i * 92, 98, 40, 5),
])

const cart: Drawing = [
  box(24, 16, 164, 32),
  box(32, 22, 20, 20, 3, 'base'),
  bar(62, 25, 70, 6, 'dark'),
  bar(62, 36, 40, 5),
  box(24, 56, 164, 32),
  box(32, 62, 20, 20, 3, 'base'),
  bar(62, 65, 80, 6, 'dark'),
  bar(62, 76, 36, 5),
  box(24, 96, 164, 24),
  box(200, 16, 96, 104),
  bar(212, 30, 50, 6, 'dark'),
  bar(212, 46, 72, 5),
  bar(212, 58, 64, 5),
  bar(212, 78, 36, 8, 'dark'),
  pill(212, 98, 72, 14, 'dark'),
]

const chart: Drawing = [
  bar(32, 108, 256, 1.5, 'strong'),
  box(48, 72, 24, 36, 3, 'base'),
  box(84, 52, 24, 56, 3, 'strong'),
  box(120, 62, 24, 46, 3, 'base'),
  box(156, 30, 24, 78, 3, 'dark'),
  box(192, 48, 24, 60, 3, 'strong'),
  box(228, 40, 24, 68, 3, 'base'),
]

const checks: Drawing = [
  box(96, 24, 16, 16, 4, 'dark'),
  bar(124, 29, 96, 6, 'dark'),
  box(96, 54, 16, 16, 4),
  bar(124, 59, 76, 6, 'strong'),
  box(96, 84, 16, 16, 4),
  bar(124, 89, 108, 6, 'strong'),
]

const code: Drawing = [
  box(24, 14, 272, 100, 8, 'ink'),
  dot(40, 28, 3, 'inkline'),
  dot(52, 28, 3, 'inkline'),
  dot(64, 28, 3, 'inkline'),
  bar(40, 46, 70, 5, 'inkline'),
  bar(52, 60, 130, 5, 'inkline'),
  bar(52, 74, 96, 5, 'inkline'),
  bar(40, 88, 40, 5, 'inkline'),
]

const detailsList: Drawing = [
  bar(40, 24, 56, 6, 'strong'),
  bar(160, 24, 100, 6, 'dark'),
  bar(40, 36, 240, 1.5, 'base'),
  bar(40, 50, 44, 6, 'strong'),
  bar(160, 50, 80, 6, 'dark'),
  bar(40, 62, 240, 1.5, 'base'),
  bar(40, 76, 64, 6, 'strong'),
  bar(160, 76, 110, 6, 'dark'),
  bar(40, 88, 240, 1.5, 'base'),
  bar(40, 102, 50, 6, 'strong'),
  bar(160, 102, 70, 6, 'dark'),
]

const dividers: Drawing = [
  bar(40, 22, 120, 6, 'dark'),
  bar(40, 36, 200, 5),
  bar(40, 62, 240, 1.5, 'strong'),
  pill(136, 55, 48, 16, 'base'),
  bar(40, 88, 160, 6, 'dark'),
  bar(40, 102, 220, 5),
]

const dropdown: Drawing = [
  box(96, 14, 128, 28, 6),
  bar(108, 25, 52, 6, 'dark'),
  dot(208, 28, 4, 'strong'),
  box(96, 50, 128, 68, 6),
  box(102, 56, 116, 18, 4, 'soft'),
  bar(112, 62, 60, 6, 'dark'),
  bar(112, 82, 70, 6, 'strong'),
  bar(112, 98, 50, 6, 'strong'),
]

const emptyState: Drawing = [
  dot(160, 36, 20, 'base'),
  bar(118, 68, 84, 8, 'dark'),
  bar(100, 84, 120, 5),
  pill(136, 100, 48, 16, 'dark'),
]

const fileUploader: Drawing = [
  dashedBox(48, 14, 224, 100),
  dot(160, 46, 14, 'strong'),
  bar(118, 72, 84, 7, 'dark'),
  bar(104, 88, 112, 5),
]

const filters: Drawing = [
  pill(24, 14, 52, 20, 'dark'),
  pill(84, 14, 60, 20, 'base'),
  pill(152, 14, 44, 20, 'base'),
  box(24, 46, 88, 72),
  box(116, 46, 88, 72),
  box(208, 46, 88, 72),
  box(30, 52, 76, 34, 4, 'base'),
  box(122, 52, 76, 34, 4, 'base'),
  box(214, 52, 76, 34, 4, 'base'),
]

const form: Drawing = [
  bar(40, 14, 48, 5, 'strong'),
  box(40, 24, 240, 22, 5),
  bar(40, 56, 60, 5, 'strong'),
  box(40, 66, 240, 22, 5),
  pill(40, 98, 72, 20, 'dark'),
]

const inputs: Drawing = [
  box(40, 18, 240, 26, 6),
  bar(52, 28, 90, 6, 'strong'),
  box(40, 52, 240, 26, 6),
  bar(52, 62, 120, 6, 'dark'),
  box(40, 86, 150, 26, 6),
  bar(52, 96, 60, 6, 'strong'),
]

const grid: Drawing = [0, 1, 2].flatMap((col) =>
  [0, 1].map((row) => box(24 + col * 92, 14 + row * 54, 84, 46, 6, row === 0 ? 'base' : 'surface')),
)

const features: Drawing = [0, 1, 2].flatMap((col) => [
  dot(48 + col * 100, 36, 12, 'strong'),
  bar(32 + col * 100, 62, 50, 7, 'dark'),
  bar(32 + col * 100, 76, 70, 5),
  bar(32 + col * 100, 86, 56, 5),
])

const loaders: Drawing = [
  ring(110, 64, 22),
  dot(110, 42, 5, 'dark'),
  dot(190, 64, 7, 'dark'),
  dot(212, 64, 7, 'strong'),
  dot(234, 64, 7, 'base'),
]

const media: Drawing = [
  box(32, 22, 56, 56, 6, 'base'),
  bar(100, 26, 90, 7, 'dark'),
  bar(100, 42, 160, 5),
  bar(100, 54, 130, 5),
  box(32, 90, 28, 28, 4, 'base'),
  bar(72, 96, 70, 6, 'dark'),
  bar(72, 108, 110, 5),
]

const modal: Drawing = [
  box(0, 0, 320, 128, 0, 'base'),
  box(80, 18, 160, 92, 10),
  bar(96, 34, 70, 7, 'dark'),
  bar(96, 52, 128, 5),
  bar(96, 64, 104, 5),
  pill(150, 86, 36, 14, 'base'),
  pill(192, 86, 36, 14, 'dark'),
]

const pageHeader: Drawing = [
  bar(24, 24, 120, 11, 'dark'),
  bar(24, 44, 200, 5),
  pill(244, 24, 52, 22, 'dark'),
  bar(24, 70, 272, 1.5, 'strong'),
  bar(24, 86, 80, 6, 'strong'),
  bar(112, 86, 60, 6, 'strong'),
]

const pagination: Drawing = [
  box(60, 50, 28, 28, 6),
  box(96, 50, 28, 28, 6),
  box(132, 50, 28, 28, 6, 'dark'),
  box(168, 50, 28, 28, 6),
  box(204, 50, 28, 28, 6),
  box(240, 50, 28, 28, 6),
]

const pricing: Drawing = [
  box(28, 16, 80, 100),
  bar(40, 30, 32, 6, 'strong'),
  bar(40, 44, 44, 11, 'dark'),
  bar(40, 66, 56, 5),
  bar(40, 78, 48, 5),
  pill(40, 96, 56, 12, 'base'),
  box(120, 8, 80, 112, 6, 'base'),
  bar(132, 24, 32, 6, 'strong'),
  bar(132, 38, 44, 11, 'dark'),
  bar(132, 62, 56, 5, 'strong'),
  bar(132, 74, 48, 5, 'strong'),
  pill(132, 100, 56, 12, 'dark'),
  box(212, 16, 80, 100),
  bar(224, 30, 32, 6, 'strong'),
  bar(224, 44, 44, 11, 'dark'),
  bar(224, 66, 56, 5),
  bar(224, 78, 48, 5),
  pill(224, 96, 56, 12, 'base'),
]

const banner: Drawing = [
  box(24, 14, 272, 30, 8, 'base'),
  bar(38, 26, 140, 6, 'dark'),
  pill(236, 21, 46, 16, 'dark'),
  ...pageLines(62),
]

// A strip across the top of the page, as opposed to a banner inside it.
const announcement: Drawing = [
  box(0, 0, 320, 26, 0, 'dark'),
  bar(70, 10, 120, 6, 'surface'),
  pill(204, 8, 44, 10, 'surface'),
  ...pageLines(48),
]

const productGrid: Drawing = [0, 1, 2].flatMap((i) => [
  box(28 + i * 90, 14, 78, 100),
  box(34 + i * 90, 20, 66, 56, 4, 'base'),
  bar(34 + i * 90, 84, 44, 6, 'dark'),
  bar(34 + i * 90, 98, 24, 8, 'strong'),
])

const collectionTiles: Drawing = [
  box(24, 14, 130, 100, 8, 'base'),
  pill(36, 92, 70, 14, 'surface'),
  box(166, 14, 130, 46, 8, 'strong'),
  pill(178, 38, 56, 14, 'surface'),
  box(166, 68, 130, 46, 8, 'base'),
  pill(178, 92, 62, 14, 'surface'),
]

const sideMenu: Drawing = [
  box(24, 12, 84, 104, 8),
  dot(40, 30, 6, 'strong'),
  bar(54, 27, 44, 6, 'dark'),
  box(30, 46, 72, 20, 4, 'soft'),
  bar(40, 53, 48, 6, 'dark'),
  bar(40, 78, 52, 6, 'strong'),
  bar(40, 92, 40, 6, 'strong'),
  bar(124, 24, 110, 8, 'soft'),
  bar(124, 44, 170, 5, 'soft'),
  bar(124, 56, 150, 5, 'soft'),
]

const verticalMenu: Drawing = [
  box(88, 12, 144, 104, 8),
  dot(106, 32, 5, 'strong'),
  bar(120, 29, 70, 6, 'dark'),
  box(94, 48, 132, 22, 4, 'soft'),
  dot(106, 59, 5, 'dark'),
  bar(120, 56, 56, 6, 'dark'),
  dot(106, 86, 5, 'strong'),
  bar(120, 83, 80, 6, 'strong'),
  dot(106, 104, 5, 'strong'),
  bar(120, 101, 48, 6, 'strong'),
]

const skipLink: Drawing = [pill(24, 14, 84, 24, 'dark'), ...pageLines(58)]

const stats: Drawing = [0, 1, 2].flatMap((i) => [
  box(24 + i * 92, 24, 84, 80),
  bar(36 + i * 92, 38, 40, 5, 'strong'),
  bar(36 + i * 92, 54, 52, 14, 'dark'),
  bar(36 + i * 92, 82, 32, 5, 'base'),
])

const steps: Drawing = [
  dot(64, 52, 14, 'dark'),
  bar(80, 51, 66, 2, 'strong'),
  dot(160, 52, 14, 'dark'),
  bar(176, 51, 66, 2, 'strong'),
  dot(256, 52, 14, 'base'),
  bar(44, 82, 40, 6, 'dark'),
  bar(140, 82, 40, 6, 'dark'),
  bar(236, 82, 40, 6, 'strong'),
]

const table: Drawing = [
  box(24, 14, 272, 100, 8),
  box(24, 14, 272, 24, 8, 'soft'),
  bar(40, 23, 40, 6, 'strong'),
  bar(130, 23, 40, 6, 'strong'),
  bar(220, 23, 40, 6, 'strong'),
  bar(40, 52, 64, 6, 'dark'),
  bar(130, 52, 50, 6),
  bar(220, 52, 40, 6),
  bar(40, 72, 56, 6, 'dark'),
  bar(130, 72, 60, 6),
  bar(220, 72, 36, 6),
  bar(40, 92, 70, 6, 'dark'),
  bar(130, 92, 44, 6),
  bar(220, 92, 46, 6),
]

const tabs: Drawing = [
  bar(40, 22, 44, 7, 'dark'),
  bar(100, 22, 44, 7, 'strong'),
  bar(160, 22, 44, 7, 'strong'),
  bar(24, 38, 272, 1.5, 'strong'),
  bar(36, 36, 56, 3, 'dark'),
  box(24, 54, 272, 62),
  bar(40, 68, 120, 7, 'dark'),
  bar(40, 84, 200, 5),
  bar(40, 96, 160, 5),
]

const timeline: Drawing = [
  bar(70, 10, 2, 108, 'strong'),
  dot(71, 26, 6, 'dark'),
  bar(92, 20, 100, 7, 'dark'),
  bar(92, 34, 160, 5),
  dot(71, 64, 6, 'dark'),
  bar(92, 58, 80, 7, 'dark'),
  bar(92, 72, 140, 5),
  dot(71, 102, 6, 'strong'),
  bar(92, 96, 110, 7, 'strong'),
  bar(92, 110, 120, 5),
]

const toasts: Drawing = [
  box(70, 18, 180, 34, 8),
  dot(90, 35, 7, 'dark'),
  bar(106, 28, 90, 6, 'dark'),
  bar(106, 40, 120, 5),
  box(70, 64, 180, 34, 8),
  dot(90, 81, 7, 'strong'),
  bar(106, 74, 70, 6, 'dark'),
  bar(106, 86, 100, 5),
]

const toggles: Drawing = [
  pill(100, 24, 40, 22, 'dark'),
  dot(129, 35, 8, 'surface'),
  bar(154, 31, 80, 6, 'dark'),
  pill(100, 58, 40, 22, 'base'),
  dot(111, 69, 8, 'surface'),
  bar(154, 65, 100, 6, 'strong'),
  pill(100, 92, 40, 22, 'base'),
  dot(111, 103, 8, 'surface'),
  bar(154, 99, 60, 6, 'strong'),
]

const testimonials: Drawing = [
  box(24, 14, 134, 100),
  dot(42, 32, 6, 'strong'),
  bar(36, 48, 106, 5, 'dark'),
  bar(36, 60, 90, 5),
  bar(36, 72, 100, 5),
  dot(44, 96, 8, 'base'),
  bar(58, 92, 50, 6, 'dark'),
  box(166, 14, 130, 100),
  dot(184, 32, 6, 'strong'),
  bar(178, 48, 102, 5, 'dark'),
  bar(178, 60, 80, 5),
  bar(178, 72, 96, 5),
  dot(186, 96, 8, 'base'),
  bar(200, 92, 50, 6, 'dark'),
]

const team: Drawing = [0, 1, 2, 3].flatMap((i) => [
  dot(56 + i * 70, 44, 22, i % 2 === 0 ? 'strong' : 'base'),
  bar(36 + i * 70, 78, 40, 6, 'dark'),
  bar(40 + i * 70, 92, 32, 5),
])

const logoCloud: Drawing = [
  pill(36, 32, 64, 18, 'base'),
  pill(112, 32, 48, 18, 'strong'),
  pill(172, 32, 72, 18, 'base'),
  pill(256, 32, 28, 18, 'strong'),
  pill(52, 70, 56, 18, 'strong'),
  pill(120, 70, 72, 18, 'base'),
  pill(204, 70, 52, 18, 'strong'),
]

const newsletter: Drawing = [
  bar(70, 22, 140, 9, 'dark'),
  bar(70, 40, 180, 5),
  box(70, 62, 150, 28, 6),
  bar(82, 73, 60, 6, 'strong'),
  pill(228, 62, 22, 28, 'dark'),
]

const callToAction: Drawing = [
  bar(80, 28, 160, 12, 'dark'),
  bar(100, 50, 120, 5),
  bar(110, 62, 100, 5),
  pill(106, 82, 50, 20, 'dark'),
  box(164, 82, 50, 20, 10),
]

const hero: Drawing = [
  bar(32, 28, 100, 10, 'dark'),
  bar(32, 46, 130, 5),
  bar(32, 58, 110, 5),
  pill(32, 78, 48, 18, 'dark'),
  box(188, 16, 100, 96, 8, 'base'),
]

const footer: Drawing = [
  ...pageLines(14),
  box(0, 62, 320, 66, 0, 'base'),
  bar(36, 76, 44, 7, 'dark'),
  bar(36, 92, 36, 5, 'strong'),
  bar(36, 104, 44, 5, 'strong'),
  bar(130, 76, 44, 7, 'dark'),
  bar(130, 92, 40, 5, 'strong'),
  bar(130, 104, 32, 5, 'strong'),
  bar(224, 76, 44, 7, 'dark'),
  bar(224, 92, 36, 5, 'strong'),
  bar(224, 104, 42, 5, 'strong'),
]

const header: Drawing = [
  box(24, 16, 272, 32, 8),
  bar(38, 29, 34, 7, 'dark'),
  bar(120, 30, 28, 5, 'strong'),
  bar(158, 30, 28, 5, 'strong'),
  bar(196, 30, 28, 5, 'strong'),
  pill(248, 25, 36, 14, 'dark'),
  ...pageLines(68),
]

const progress: Drawing = [
  box(40, 30, 240, 10, 5, 'base'),
  bar(40, 30, 150, 10, 'dark'),
  box(40, 58, 240, 10, 5, 'base'),
  bar(40, 58, 90, 10, 'dark'),
  box(40, 86, 240, 10, 5, 'base'),
  bar(40, 86, 200, 10, 'dark'),
]

const alert: Drawing = toasts

export const SKELETONS = {
  accordion,
  alert,
  announcement,
  appShell,
  avatars,
  badges,
  banner,
  breadcrumbs,
  buttonGroup,
  buttons,
  callToAction,
  cardGrid,
  cart,
  chart,
  checks,
  code,
  collectionTiles,
  detailsList,
  dividers,
  dropdown,
  emptyState,
  features,
  fileUploader,
  filters,
  footer,
  form,
  grid,
  header,
  hero,
  inputs,
  loaders,
  logoCloud,
  media,
  modal,
  newsletter,
  pageHeader,
  pagination,
  pricing,
  productGrid,
  progress,
  sideMenu,
  skipLink,
  stats,
  steps,
  table,
  tabs,
  team,
  testimonials,
  timeline,
  toasts,
  toggles,
  verticalMenu,
} satisfies Record<string, Drawing>

export type SkeletonName = keyof typeof SKELETONS

/** Which drawing each collection uses, by slug. Add a line when you add a collection. */
export const SKELETON_BY_SLUG: Record<string, SkeletonName> = {
  accordions: 'accordion',
  alerts: 'alert',
  announcements: 'announcement',
  'app-shells': 'appShell',
  avatars: 'avatars',
  badges: 'badges',
  banners: 'banner',
  'blog-cards': 'cardGrid',
  breadcrumbs: 'breadcrumbs',
  'button-groups': 'buttonGroup',
  buttons: 'buttons',
  cards: 'cardGrid',
  carts: 'cart',
  charts: 'chart',
  checkboxes: 'checks',
  'code-blocks': 'code',
  'contact-forms': 'form',
  ctas: 'callToAction',
  'details-list': 'detailsList',
  dividers: 'dividers',
  dropdown: 'dropdown',
  'empty-states': 'emptyState',
  faqs: 'accordion',
  'feature-grids': 'features',
  'file-uploaders': 'fileUploader',
  filters: 'filters',
  footers: 'footer',
  'form-layouts': 'form',
  grids: 'grid',
  headers: 'header',
  inputs: 'inputs',
  loaders: 'loaders',
  'logo-clouds': 'logoCloud',
  media: 'media',
  modals: 'modal',
  'newsletter-signup': 'newsletter',
  'page-headers': 'pageHeader',
  pagination: 'pagination',
  pricing: 'pricing',
  'product-cards': 'productGrid',
  'product-collections': 'collectionTiles',
  'progress-bars': 'progress',
  'radio-groups': 'checks',
  sections: 'hero',
  selects: 'dropdown',
  'side-menu': 'sideMenu',
  'skip-links': 'skipLink',
  stats: 'stats',
  steps: 'steps',
  tables: 'table',
  tabs: 'tabs',
  'team-sections': 'team',
  testimonials: 'testimonials',
  timelines: 'timeline',
  toasts: 'toasts',
  toggles: 'toggles',
  'vertical-menu': 'verticalMenu',
}

export const getSkeleton = (slug: string): Shape[] | undefined => {
  const name = SKELETON_BY_SLUG[slug]

  return name ? SKELETONS[name] : undefined
}
