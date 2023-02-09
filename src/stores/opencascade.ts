import { writable } from 'svelte/store';
import initOpenCascade from '../../node_modules/opencascade.js/dist/index?url';
import type { OpenCascadeInstance } from 'opencascade.js';
import { browser } from '$app/environment';

const { set, subscribe } = writable<Promise<OpenCascadeInstance>>(new Promise(() => null));

const opencascade = {
	subscribe,
	load: () => {
		if (browser) {
			console.log('OC Load Started');
			const start = performance.now();
			import(/* @vite-ignore */ initOpenCascade).then((res) => {
				const oc = res.default();
				set(oc);
				oc.then(() => {
					console.log(`OC Loaded in ${performance.now() - start}ms`);
				});
			});
		} else {
			console.warn('attempt load on server');
		}
	}
};

export default opencascade;
