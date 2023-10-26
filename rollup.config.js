import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const buildPlugins = [esbuild()]

/**
 * @type {import('rollup').RollupOptions[]}
 */
export default [
	{
		plugins: buildPlugins,
		input: 'src/index.ts',
		output: [
			{ file: 'dist/index.js', format: 'esm' },
			{ file: 'dist/index.cjs', format: 'cjs' }
		]
	},

	{
		plugins: buildPlugins,
		input: 'src/2d/index.ts',
		output: [
			{ file: 'dist/2d/index.js', format: 'esm' },
			{ file: 'dist/2d/index.cjs', format: 'cjs' }
		]
	},

	{
		plugins: buildPlugins,
		input: 'src/3d/index.ts',
		output: [
			{ file: 'dist/3d/index.js', format: 'esm' },
			{ file: 'dist/3d/index.cjs', format: 'cjs' }
		]
	},

	{
		plugins: [dts()],
		input: 'src/index.ts',
		output: [{ file: 'dist/index.d.ts', format: 'esm' }]
	},

	{
		plugins: [dts()],
		input: 'src/2d/index.ts',
		output: [{ file: 'dist/2d/index.d.ts', format: 'esm' }]
	},

	{
		plugins: [dts()],
		input: 'src/3d/index.ts',
		output: [{ file: 'dist/3d/index.d.ts', format: 'esm' }]
	}
]

