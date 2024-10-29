import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig([
	{
		input: 'src/index.ts',
		plugins: [esbuild()],
		output: [
			{
				dir: 'dist/esm',
				format: 'es',
				exports: 'named',
				preserveModules: true,
				entryFileNames: '[name].js'
			},
			{
				dir: 'dist/cjs',
				format: 'cjs',
				exports: 'named',
				preserveModules: true,
				entryFileNames: '[name].cjs'
			}
		]
	},

	{
		input: 'src/index.ts',
		plugins: [esbuild({ minify: true, target: 'es2015' })],
		output: [
			{
				file: 'dist/vecteur.min.js',
				format: 'es',
				exports: 'named'
			}
		]
	},

	{
		input: 'src/index.ts',
		plugins: [dts()],
		output: {
			dir: 'dist/types',
			format: 'es',
			exports: 'named',
			preserveModules: true
		}
	}
])
