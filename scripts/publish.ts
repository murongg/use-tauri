import { execSync } from 'node:child_process'
import path from 'node:path'
import { consola } from 'consola'
import { version } from '../package.json'
import { packages } from './constants'

execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta'))
  command += ' --tag beta'

for (const name of packages) {
  execSync(command, { stdio: 'inherit', cwd: path.join('packages', name, 'dist') })
  consola.success(`Published @use-tauri/${name}`)
}
