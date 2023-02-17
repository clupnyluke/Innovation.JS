import merge from 'lodash/merge';
import type { OpenCascadeInstance } from 'opencascade.js';
import ax2 from '../oc_core/ax2';
import { rotate } from '../transform';

const wedge = (
	oc: OpenCascadeInstance,
	opts?: {
		base?: [number, number];
		top?: [number, number];
		topCenter?: [number, number];
		height?: number;
		origin?: [number, number, number];
		zDirection?: [number, number, number];
	}
) => {
	const _opts = merge(
		{
			base: [1, 1],
			height: 1,
			top: [1, 1],
			origin: [0, 0, 0],
			topCenter: [0, 0]
		},
		opts
	);
	const { origin, zDirection, base, height, top, topCenter } = _opts;
	const [x, y] = base;
	const [dx, dy] = top;
	const [tx, ty] = topCenter.map((val, i) => val + (origin[i * 2] + top[i] / 2));
	origin[0] = -(origin[0] + x) / 2;
	origin[1] = -(origin[1] + y) / 2;
	const tmp = origin[2];
	origin[2] = origin[1];
	origin[1] = tmp;
	return rotate(
		oc,
		new oc.BRepPrimAPI_MakeWedge_4(
			ax2(oc, { direction: zDirection, origin }),
			x,
			height,
			y,
			tx - dx,
			ty - dy,
			tx + dx,
			ty + dy
		).Shape(),
		{ rotation: [90, 0, 0], isRadians: false }
	);
};

export default wedge;
