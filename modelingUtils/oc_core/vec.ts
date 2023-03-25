import type { OpenCascadeInstance } from 'opencascade.js';
import merge from 'lodash/merge';

const vec = (oc: OpenCascadeInstance, opts?: { vec?: [number, number, number] }) => {
	const _opts = merge({ vec: [0, 0, 0] }, opts);
	const { vec } = _opts;
	const [x, y, z] = vec;
	return new oc.gp_Vec_4(x, y, z);
};

export default vec;
