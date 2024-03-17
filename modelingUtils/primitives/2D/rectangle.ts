import merge from 'lodash/merge';
import { OpenCascadeInstance } from 'opencascade.js';
import { fromPoints } from '../wire';

const rectangle = (
	oc: OpenCascadeInstance,
	opts?: {
		size?: [number, number] | [number] | number;
		origin?: [number, number];
	}
) => {
	const _opts = merge({ size: [1, 1], origin: [0, 0] }, opts);
	const { origin, size } = _opts;
	const [x, y] = Array.isArray(size) ? [...size, 1, 1] : [size, size];
	const [a, b] = origin;
	const points: [number, number, number][] = [
		[a + x / 2, b + y / 2, 0],
		[a - x / 2, b + y / 2, 0],
		[a - x / 2, b - y / 2, 0],
		[a + x / 2, b - y / 2, 0]
	];
	return new oc.BRepBuilderAPI_MakeFace_15(fromPoints(oc, points), true).Face();
};

export default rectangle;
