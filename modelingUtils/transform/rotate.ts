import { ax1 } from '../oc_core';
import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import merge from 'lodash/merge';
const rotate = (
	oc: OpenCascadeInstance,
	shape: TopoDS_Shape,
	opts: {
		rotation: [number, number, number];
		isRadians?: boolean;
	}
) => {
	const _opts = merge({ isRadians: true }, opts);
	const { rotation, isRadians } = _opts;
	const transform1 = new oc.gp_Trsf_1();
	const transform2 = new oc.gp_Trsf_1();
	const transform3 = new oc.gp_Trsf_1();
	const scale = isRadians ? 1 : Math.PI / 180;
	transform1.SetRotation_1(ax1(oc, { direction: [1, 0, 0] }), rotation[0] * scale);
	transform2.SetRotation_1(ax1(oc, { direction: [0, 1, 0] }), rotation[1] * scale);
	transform3.SetRotation_1(ax1(oc, { direction: [0, 0, 1] }), rotation[2] * scale);
	let transformer = new oc.BRepBuilderAPI_Transform_1(transform1);
	transformer.Perform(shape, false);
	let _shape = transformer.Shape();
	transformer = new oc.BRepBuilderAPI_Transform_1(transform2);
	transformer.Perform(_shape, false);
	_shape = transformer.Shape();
	transformer = new oc.BRepBuilderAPI_Transform_1(transform3);
	transformer.Perform(_shape, false);
	_shape = transformer.Shape();
	return _shape;
};

export default rotate;
