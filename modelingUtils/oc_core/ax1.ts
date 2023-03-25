import type { OpenCascadeInstance } from 'opencascade.js';
import { dir, pnt } from '.';

const ax1 = (
	oc: OpenCascadeInstance,
	opts?: { direction?: [number, number, number]; origin?: [number, number, number] }
) => {
	const _opts = { ...opts };
	const { origin, direction } = _opts;
	return new oc.gp_Ax1_2(pnt(oc, { pnt: origin }), dir(oc, { direction }));
};

export default ax1;
