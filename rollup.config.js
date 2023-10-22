import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

import packageJson from './package.json' assert { type: 'json' }

const name = packageJson.main.replace(/\.cjs$/, '')

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
	...config,
	input: 'src/index.ts',
	external: (id) => !/^[./]/.test(id)
})

/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
	bundle({
		plugins: [esbuild({ minify: true, keepNames: true })],
		output: [
			{
				file: `${name}.js`,
				format: 'esm'
			},
			{
				file: `${name}.cjs`,
				format: 'cjs'
			}
		]
	}),

	bundle({
		plugins: [dts()],
		output: [
			{
				file: `${name}.d.ts`,
				format: 'esm'
			}
		]
	})
]

