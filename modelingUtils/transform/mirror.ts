import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import { ax1, ax2, pnt } from '../oc_core';
const mirror = (
	oc: OpenCascadeInstance,
	shape: TopoDS_Shape,
	opts: {
		point?: [number, number, number];
		axis?: { origin?: [number, number, number]; direction?: [number, number, number] };
		plane?: [number, number, number];
	}
) => {
	const transform = new oc.gp_Trsf_1();
	const { point, axis, plane } = opts;
	if (plane) {
		transform.SetMirror_3(
			ax2(oc, {
				origin: [plane[0], plane[1], plane[2]],
				direction: [-plane[0], -plane[1], -plane[2]]
			})
		);
	} else if (axis) {
		const { origin, direction } = axis;
		transform.SetMirror_2(ax1(oc, { origin, direction }));
	} else if (point) {
		transform.SetMirror_1(pnt(oc, { pnt: point }));
	} else {
		console.warn('No Mirror set');
		return shape;
	}
	const transformer = new oc.BRepBuilderAPI_Transform_1(transform);
	transformer.Perform(shape, false);
	return transformer.Shape();
};

export default mirror;
