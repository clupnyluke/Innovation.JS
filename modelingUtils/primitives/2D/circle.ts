import merge from 'lodash/merge';
import { OpenCascadeInstance } from 'opencascade.js';
import { fromPoints } from '../wire';
import { ax2 } from '../../oc_core';

const circle = (
	oc: OpenCascadeInstance,
	opts?: {
		radius?: number;
		origin?: [number, number];
	}
) => {
	const _opts = merge({ radius: 1, origin: [0, 0] }, opts);
	const { origin, radius } = _opts;
	const circle = new oc.gp_Circ_2(
		ax2(oc, { origin: [...origin, 0] as [number, number, number] }),
		radius
	);
	const edge = new oc.BRepBuilderAPI_MakeEdge_8(circle).Edge();
	const wire = new oc.BRepBuilderAPI_MakeWire_2(edge).Wire();
	return new oc.BRepBuilderAPI_MakeFace_15(wire, true).Face();
};

export default circle;
