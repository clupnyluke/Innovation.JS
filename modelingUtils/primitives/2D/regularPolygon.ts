import merge from 'lodash/merge';
import { OpenCascadeInstance } from 'opencascade.js';
import { fromPoints } from '../wire';

const regularPolygon = (
	oc: OpenCascadeInstance,
	opts?: {
		sides?: number;
		circumradius?: number;
		origin?: [number, number];
	}
) => {
	const _opts = merge({ circumradius: 1, origin: [0, 0], sides: 3 }, opts);
	console.log(_opts);
	const { origin, circumradius, sides } = _opts;
	const [a, b] = origin;
	if (sides < 3) {
		console.error('Invalid number of sides');
	}
	const increment = (2 * Math.PI) / sides;
	const points: [number, number, number][] = [];
	for (let i = 0; i < sides; i++) {
		const x = circumradius * Math.cos(i * increment) + a;
		const y = circumradius * Math.sin(i * increment) + b;
		points.push([x, y, 0]);
	}
	return new oc.BRepBuilderAPI_MakeFace_15(fromPoints(oc, points), true).Face();
};

export default regularPolygon;
