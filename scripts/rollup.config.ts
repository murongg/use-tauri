import { builtinModules } from 'node:module'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import esbuild from 'rollup-plugin-esbuild'
import rollupDts from 'rollup-plugin-dts'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import type { RollupOptions } from 'rollup'
import { defineConfig } from 'rollup'

const packages = ['core', 'react', 'vue', 'use-tauri']
const inputs = packages.map(pkg => ({
  input: `packages/${pkg}/index.ts`,
  pkg,
}))

const external = [
  ...builtinModules,
]

const plugins = [
  json(),
  nodeResolve({
    preferBuiltins: true,
  }),
  commonjs(),
  esbuild({
    target: 'node14',
  }),
]

const mainPkgFiles = readdirSync(path.join(__dirname, '../packages/use-tauri/src'))

for (const file of mainPkgFiles) {
  // is .ts file
  if (file.endsWith('.ts')) {
    inputs.push({
      input: `packages/use-tauri/src/${file}`,
      pkg: 'use-tauri',
    })
  }
}

const configs: RollupOptions[] = []

for (const item of inputs) {
  const input = item.input
  const outputDir = `packages/${item.pkg}/dist`
  const esm: RollupOptions = {
    input,
    output: {
      dir: outputDir,
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    external,
    plugins: [
      ...plugins,
    ],
  }
  configs.push(esm)
  const cjs: RollupOptions = {
    input,
    output: {
      dir: outputDir,
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
    external,
    plugins: [
      ...plugins,
    ],
  }
  configs.push(cjs)
  const dts: RollupOptions = {
    input,
    output: {
      dir: outputDir,
      entryFileNames: '[name].d.ts',
      format: 'esm',
    },
    external,
    plugins: [
      rollupDts({ respectExternal: true }),
    ],
  }
  configs.push(dts)
}

export default () => defineConfig(configs)
