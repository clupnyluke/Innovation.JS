/* eslint-disable @typescript-eslint/ban-ts-comment */
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig, ViteDevServer } from 'vite';
import socketServer from './server/socketServer';

import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		// @ts-ignore
		const io = new Server(server.httpServer);

		socketServer(io);
	}
};

const config: UserConfig = {
	plugins: [sveltekit(), webSocketServer],
	optimizeDeps: {
		exclude: ['opencascade.js', './modeling'],
		force: true
	},
	assetsInclude: ['**/*.wasm'],
	ssr: {
		noExternal: ['three', 'troika-three-text'],
		external: ['opencascade.js']
	},
	build: {
		rollupOptions: {
			external: [/.+\.wasm/]
		}
	}
};

export default config;
