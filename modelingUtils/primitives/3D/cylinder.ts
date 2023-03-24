import merge from 'lodash/merge';
import type { OpenCascadeInstance } from 'opencascade.js';
import ax2 from '../oc_core/ax2';
import { TAU } from '../constants';

const cylinder = (
	oc: OpenCascadeInstance,
	opts?: {
		height?: number;
		radius?: number;
		origin?: [number, number, number];
		zDirection?: [number, number, number];
		angle?: number;
	}
) => {
	const _opts = merge({ height: 1, radius: 1, angle: TAU }, opts);
	const { height, radius, origin, zDirection, angle } = _opts;
	const axes = ax2(oc, { origin, direction: zDirection });
	return new oc.BRepPrimAPI_MakeCylinder_4(axes, radius, height, angle).Shape();
};

export default cylinder;
