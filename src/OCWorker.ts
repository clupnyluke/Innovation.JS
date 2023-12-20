import { solidsToGLB } from '@Utils/solidsToGLB';
import { solidsToSTL } from '@Utils/solidsToSTL';
import initOpenCascade from 'opencascade.js';

postMessage('OC Load Started');
const ocLoadStart = performance.now();
const ocp = initOpenCascade().then((res) => {
	postMessage([`OC Load Finished`, performance.now() - ocLoadStart]);
	return res;
});

let modelfn;
let shapes;
onmessage = async (e) => {
	let data;
	switch (e.data[0]) {
		default:
			postMessage(e.data);
			break;
		case 'sendModel':
			if (e.data[1].modelCode) {
				(0, eval)(e.data[1].modelCode);
				modelfn = module[e.data[1].path].default ?? module[e.data[1].path].main;
				shapes = await modelfn(ocp);
				postMessage(['modelProcessed']);
			}
			break;
		case 'getGLB':
			data = solidsToGLB(await ocp, shapes);
			postMessage(['glb', data]);
			break;
		case 'getSTL':
			data = solidsToSTL(await ocp, shapes);
			postMessage(['stl', data]);
			break;
	}
};
