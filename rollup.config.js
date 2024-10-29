import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
	...config,
	input: 'src/index.ts',
	external: (id) => !/^[./]/.test(id)
})

function removeJSdocComments() {
	return {
		name: 'remove-jsdoc-comments',
		renderChunk(code) {
			return code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
		}
	}
}

export default [
	bundle({
		plugins: [esbuild(), removeJSdocComments()],
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
	}),

	bundle({
		plugins: [esbuild({ minify: true, target: 'es2015' })],
		output: [
			{
				file: 'dist/vecteur.min.js',
				format: 'es',
				exports: 'named'
			}
		]
	}),

	bundle({
		plugins: [dts()],
		output: {
			dir: 'dist/types',
			format: 'es',
			exports: 'named',
			preserveModules: true
		}
	})
]
