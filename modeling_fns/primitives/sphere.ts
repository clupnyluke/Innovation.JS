import merge from 'lodash/merge';
import type { OpenCascadeInstance } from 'opencascade.js';
import pnt from '../oc_core/pnt';

const sphere = (
	oc: OpenCascadeInstance,
	opts?: {
		radius?: number;
		origin?: [number, number, number];
	}
) => {
	const _opts = merge({ radius: 1, origin: [0, 0, 0] }, opts);
	const { radius, origin } = _opts;
	origin[2] = origin[2] + radius;
	return new oc.BRepPrimAPI_MakeSphere_5(pnt(oc, { coords: origin }), radius).Shape();
};

export default sphere;
