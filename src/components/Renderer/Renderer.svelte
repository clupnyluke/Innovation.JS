<script lang="ts">
	import { Canvas, OrbitControls, T } from '@threlte/core';
	import { AxesHelper, Color, MOUSE, Object3D } from 'three';
	import { degToRad } from 'three/src/math/MathUtils';
	import type { TopoDS_Shape } from 'opencascade.js';
	import { opencascade } from '@Stores';
	import { solidsToGLB } from '@Utils/solidsToGLB';
	import { GLTF } from '@threlte/extras';

	export let shapes: Promise<TopoDS_Shape | TopoDS_Shape[]>;

	let glbURL: Promise<string> = new Promise(() => null);
	$: glbURL = solidsToGLB($opencascade, shapes);
	Object3D.DefaultUp.set(0, 0, 1);
	let axes: AxesHelper;
	$: if (axes) axes.setColors(new Color(0xff0000), new Color(0x00ff00), new Color(0x0000ff));
</script>

<div class="jscad-renderer">
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
			<OrbitControls
				enableZoom={true}
				target={{ x: 0, y: 0.5 }}
				mouseButtons={{ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.PAN }}
			/>
		</T.PerspectiveCamera>

		<T.DirectionalLight position={[3, 3, 5]} intensity={0.3} />
		<T.AmbientLight intensity={1.2} />

		<!-- Floor -->
		<T.GridHelper args={[210, 210]} rotation.x={degToRad(90)} />
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
