import { execSync } from 'node:child_process'
import path from 'node:path'
import fs, { readJSONSync } from 'fs-extra'
import { packages } from './constants'
const { version: oldVersion } = readJSONSync('package.json')

const rootDir = path.resolve(__dirname, '..')

execSync('bumpp --no-commit --no-tag --no-push', { stdio: 'inherit' })

const { version } = readJSONSync('package.json')

if (oldVersion === version) {
  console.log('canceled')
  process.exit()
}

async function release() {
  for (const name of packages) {
    const packageRoot = path.resolve(rootDir, 'packages', name)
    const packageJSON = await fs.readJSON(path.join(packageRoot, 'package.json'))
    packageJSON.version = version
    await fs.writeJSON(path.join(packageRoot, 'package.json'), packageJSON, { spaces: 2 })
  }

  execSync('npm run build', { stdio: 'inherit' })
  execSync('git add .', { stdio: 'inherit' })

  execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
  execSync(`git tag -a v${version} -m "v${version}"`, { stdio: 'inherit' })

  execSync('git push', { stdio: 'inherit' })
  execSync('git push --tags', { stdio: 'inherit' })
}

release()
