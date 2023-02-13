import type { OpenCascadeInstance } from 'opencascade.js';
import pnt from './pnt';
import dir from './dir';

const ax2 = (
	oc: OpenCascadeInstance,
	opts?: { direction?: [number, number, number]; origin?: [number, number, number] }
) => {
	const _opts = { ...opts };
	const { origin, direction } = _opts;
	return new oc.gp_Ax2_3(pnt(oc, { coords: origin }), dir(oc, { direction }));
};

export default ax2;
