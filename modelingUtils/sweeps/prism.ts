import { vec } from '@modeling/oc_core';
import { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';

const prism = (
	oc: OpenCascadeInstance,
	shape: TopoDS_Shape,
	opts?: { vector?: [number, number, number] }
) => new oc.BRepPrimAPI_MakePrism_1(shape, vec(oc, { vec: opts.vector }), false, true).Shape();

export default prism;
