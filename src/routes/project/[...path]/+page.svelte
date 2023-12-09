<script lang="ts">
	import Renderer from '@Components/Renderer/Renderer.svelte';
	import type { PageData } from './$types';
	import { opencascade } from '@Stores';
	import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
	import { io } from 'socket.io-client';
	import { emit, listen } from '@Src/common/socket';
	import { onMount } from 'svelte';

	export let data: PageData;

	const socket = io();

	const { path } = data;
	onMount(() => {
		emit(socket, 'requestModel', path);
	});

	//let modelFn: (oc: Promise<OpenCascadeInstance>) => Promise<TopoDS_Shape | TopoDS_Shape[]> = () =>
	//	new Promise(() => null);

	// let shapes: Promise<TopoDS_Shape | TopoDS_Shape[]> = new Promise(() => null);

	let modelCode;

	listen(socket, 'updateModel', async ({ path: _path, module: codeExec }) => {
		if (path === _path) {
			//	(0, eval)(codeExec);
			//	modelFn = module[path].default ?? module[path].main;
			modelCode = codeExec;
		}
	});

	listen(socket, 'modelUpdated', async (_path) => {
		if (path === _path || path === '__ALL__') {
			emit(socket, 'requestModel', path);
		}
	});

	// $: shapes = modelFn($opencascade);
</script>

<slot />
<Renderer {modelCode} {path} fileName={path.substring(path.lastIndexOf('/') + 1)} />
