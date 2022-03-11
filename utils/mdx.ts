import fs from 'fs'
import path from 'path'

export const COMPONENTS_PATH = path.join(process.cwd(), 'data/components')

export const componentFilePaths = fs
  .readdirSync(COMPONENTS_PATH)
  .filter((path) => /\.mdx?$/.test(path))
