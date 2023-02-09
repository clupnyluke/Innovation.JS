import merge from 'lodash/merge';
import type { OpenCascadeInstance } from 'opencascade.js';
import { TAU } from '../constants';
import ax2 from '../oc_core/ax2';

const cone = (
	oc: OpenCascadeInstance,
	opts?: {
		r1?: number;
		r2?: number;
		height?: number;
		angle?: number;
		origin?: [number, number, number];
		zDirection?: [number, number, number];
	}
) => {
	const _opts = merge(
		{
			r1: 1,
			r2: 0,
			height: 1,
			angle: TAU
		},
		opts
	);

	const { zDirection, origin, r1, r2, height, angle } = _opts;
	const axes = ax2(oc, { origin, direction: zDirection });
	return new oc.BRepPrimAPI_MakeCone_4(axes, r1, r2, height, angle).Shape();
};
