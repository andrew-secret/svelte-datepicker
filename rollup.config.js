import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';
import autoPreprocess from 'svelte-preprocess';
import scss from 'rollup-plugin-scss'

const production = !process.env.ROLLUP_WATCH;

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

export default {
	input: 'src/index.ts',
	output: [
		{ file: pkg.module, 'format': 'es' },
		{ file: pkg.main, 'format': 'umd', name },
		{ file: pkg.main.replace('.js','.min.js'), format: 'iife', name, plugins: [terser()]}
	],
	plugins: [
		svelte({
			preprocess: autoPreprocess(),
		}),
		scss(),
		typescript({ sourceMap: !production }),
		commonjs(),
		resolve(),
	]
};
