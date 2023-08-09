import path from 'path'
import fs, { readJSONSync } from 'fs-extra'
import fg from 'fast-glob'
import { packages } from './constants'

const { version } = readJSONSync('package.json')

const rootDir = path.resolve(__dirname, '..')
const FILES_COPY_ROOT = [
  'LICENSE',
]

const FILES_COPY_LOCAL = [
  'README.md',
]

const FILES_COPY_DIST = [
  '*.cjs',
  '*.mjs',
  '*.d.ts',
]

async function buildMetaFiles() {
  for (const name of packages) {
    const packageRoot = path.resolve(rootDir, 'packages', name)
    const packageDist = path.resolve(packageRoot, 'dist')

    await fs.copyFile(path.join(rootDir, 'README.md'), path.join(packageDist, 'README.md'))

    for (const file of FILES_COPY_ROOT)
      await fs.copyFile(path.join(rootDir, file), path.join(packageDist, file))

    const files = await fg(FILES_COPY_LOCAL, { cwd: packageRoot })

    for (const file of files)
      await fs.copyFile(path.join(packageRoot, file), path.join(packageDist, file))

    const distFiles = await fg(FILES_COPY_DIST, { cwd: packageDist })
    const distDir = path.join(packageDist, 'dist')
    if (!await fs.pathExists(distDir))
      await fs.mkdirp(distDir)

    for (const file of distFiles) {
      const oldFilePath = path.join(packageDist, file)
      await fs.copyFile(oldFilePath, path.join(distDir, file))
      await fs.remove(oldFilePath)
    }

    const packageJSON = await fs.readJSON(path.join(packageRoot, 'package.json'))
    for (const key of Object.keys(packageJSON.dependencies || {})) {
      if (key.startsWith('@use-tauri/'))
        packageJSON.dependencies[key] = version
    }
    await fs.writeJSON(path.join(packageDist, 'package.json'), packageJSON, { spaces: 2 })
  }
}

buildMetaFiles()
