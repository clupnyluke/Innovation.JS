import type { OpenCascadeInstance } from 'opencascade.js';
import merge from 'lodash/merge';

const pnt = (oc: OpenCascadeInstance, opts?: { coords?: [number, number, number] }) => {
	const _opts = merge({ coords: [0, 0, 0] }, opts);
	const { coords } = _opts;
	const [x, y, z] = coords;
	return new oc.gp_Pnt_3(x, y, z);
};

export default pnt;
