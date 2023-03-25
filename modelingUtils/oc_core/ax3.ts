import type { OpenCascadeInstance } from 'opencascade.js';
import pnt from './pnt';
import dir from './dir';

const ax3 = (
	oc: OpenCascadeInstance,
	opts?: { direction?: [number, number, number]; origin?: [number, number, number] }
) => {
	const _opts = { ...opts };
	const { origin, direction } = _opts;
	return new oc.gp_Ax3_4(pnt(oc, { pnt: origin }), dir(oc, { direction }));
};

export default ax3;
