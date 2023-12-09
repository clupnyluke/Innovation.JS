<script lang="ts">
	import { Canvas, OrbitControls, T } from '@threlte/core';
	import { AxesHelper, Color, MOUSE, Object3D } from 'three';
	import { degToRad } from 'three/src/math/MathUtils';
	import type { TopoDS_Shape } from 'opencascade.js';
	import { opencascade } from '@Stores';
	import { solidsToGLB } from '@Utils/solidsToGLB';
	import { GLTF } from '@threlte/extras';
	import merge from 'lodash/merge';
	import download from '@Utils/download';
	import { solidsToSTL } from '@Utils/solidsToSTL';
	import bufferToURL from '@Utils/bufferToURL';
	import OCWorker from '../../OCWorker.ts?worker';
	import { afterUpdate, onMount } from 'svelte';

	const _opts = {
		backgroundColor: '#333'
	};

	//export let shapes: Promise<TopoDS_Shape | TopoDS_Shape[]>;
	export let modelCode;
	export let path;
	export let settings: Partial<typeof _opts> = _opts;
	const opts = merge(_opts, settings);
	const { backgroundColor } = opts;
	export let fileName;

	let glbURL: Promise<string> = new Promise(() => null);
	let stlURL: Promise<string> = new Promise(() => null);

	/*$: glbURL = solidsToGLB($opencascade, shapes).then((r) =>
		bufferToURL(r.buffer, 'modeling/gltf-binary')
	);*/

	let ocw: Worker | undefined;

	onMount(() => {
		ocw = new OCWorker();

		ocw.onmessage = (e) => {
			switch (e.data[0]) {
				default:
					console.log(e.data);
					break;
				case 'glb':
					glbURL = Promise.resolve(bufferToURL(e.data[1].buffer, 'model/gltf-binary'));
					break;
				case 'stl':
					stlURL = Promise.resolve(bufferToURL(e.data[1].buffer, 'model/stl-binary'));
					break;
			}
		};
	});

	$: ocw?.postMessage(['getGLB', { modelCode, path }]);

	Object3D.DefaultUp.set(0, 0, 1);
	let axes: AxesHelper;
	$: if (axes) axes.setColors(new Color(0xff0000), new Color(0x00ff00), new Color(0x0000ff));
	let target = { x: 0, y: 0.5 };
	const resetTarget = () => {
		target = { x: 0, y: 0.5 };
	};
</script>

<svelte:window
	on:keypress={async ({ key }) => {
		if (key === 'd') {
			download(fileName + '.stl', {
				url: await stlURL
			});
		}
	}}
/>

<div class="jscad-renderer" style={`background-color: ${backgroundColor};`}>
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
			<OrbitControls
				enableZoom={true}
				{target}
				mouseButtons={{ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.PAN }}
			/>
		</T.PerspectiveCamera>

		<T.DirectionalLight position={[1, 1, 5]} intensity={0.3} />
		<T.AmbientLight intensity={1.2} />

		<!-- Floor -->
		<T.GridHelper
			args={[210, 210, new Color(0xcc2222), new Color(0x666666)]}
			rotation.x={degToRad(90)}
		/>
		<T.GridHelper
			args={[210, 42, new Color(0xcc2222), new Color(0xcc2222)]}
			rotation.x={degToRad(90)}
		/>
		{#await glbURL then url}
			<GLTF {url} />
		{/await}
		<T.AxesHelper bind:ref={axes} />
	</Canvas>
</div>

<style lang="scss">
	div.jscad-renderer {
		display: flex;
		flex: 1;
		width: 100vw;
		height: 100vh;
	}
</style>
