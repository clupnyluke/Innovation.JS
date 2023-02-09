import { vitePreprocess } from '@sveltejs/kit/vite';
import seqPreprocessor from 'svelte-sequential-preprocessor';
import { preprocessThrelte } from '@threlte/preprocess';

import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: seqPreprocessor([vitePreprocess(), preprocessThrelte()]),

	kit: {
		adapter: adapter(),
		alias: {
			'@Components': 'src/components',
			'@Utils': 'src/utils',
			'@Modeling': 'src/modeling',
			'@Stores': 'src/stores',
			'@Src': 'src'
		}
	}
};

export default config;
