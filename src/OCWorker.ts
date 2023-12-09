import { solidsToGLB } from '@Utils/solidsToGLB';
import initOpenCascade from 'opencascade.js';

postMessage('OC Load Started');
const ocLoadStart = performance.now();
const ocp = initOpenCascade().then((res) => {
	postMessage([`OC Load Finished`, performance.now() - ocLoadStart]);
	return res;
});

onmessage = async (e) => {
	let modelfn;
	let data;
	let shapes;
	switch (e.data[0]) {
		default:
			postMessage(e.data);
			break;
		case 'getGLB':
			(0, eval)(e.data[1].modelCode);
			modelfn = module[e.data[1].path].default ?? module[e.data[1].path].main;
			data = solidsToGLB(await ocp, await modelfn(ocp));
			postMessage(['glb', data]);
			break;
		case 'getSTL':
			break;
	}
};
