import type { Server, Socket } from 'socket.io';
import { emit, listen } from '../src/common/socket';
import { FSWatcher } from 'chokidar';
import serverBuildNav from '../src/common/serverBuildNav';
import * as esbuild from 'esbuild';
import nodePath from 'path';

const watcher = new FSWatcher();

const MODELING_DIR = './modeling/projects';

const emitModel = async (socket: Socket, path: string) => {
	try {
		const module = (
			await esbuild.build({
				entryPoints: [`${MODELING_DIR}/${path}.ts`],
				write: false,
				platform: 'browser',
				bundle: true,
				treeShaking: true,
				globalName: `module['${path}']`,
				outfile: 'out',
				tsconfig: 'server/tsconfig.json'
			})
		).outputFiles[0].text;
		emit(socket, 'updateModel', { path, module });
	} catch (e) {
		console.error(e);
	}
};

const socketServer = async (io: Server) => {
	const nav = async () => await serverBuildNav(MODELING_DIR, 'Projects');
	watcher.add(`${MODELING_DIR}/`);

	io.on('connection', (socket) => {
		watcher.on(
			'all',
			async (eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', path: string) => {
				const extension = path.slice(-3);
				switch (eventName) {
					default:
						// TODO: diff fs
						emit(socket, 'updateNavigation', await nav());
						break;
					case 'change':
						if (extension === '.ts' || extension == '.js') {
							const relPath = nodePath.relative(MODELING_DIR, path);
							emit(socket, 'modelUpdated', relPath.slice(0, relPath.length - 3));
						}
				}
			}
		);

		emit(socket, 'connected', 'WebSocket connected to server');

		listen(socket, 'requestNavigation', async () => {
			emit(socket, 'updateNavigation', await nav());
		});

		listen(socket, 'requestModel', async (path) => {
			emitModel(socket, path);
		});
	});
};

export default socketServer;
