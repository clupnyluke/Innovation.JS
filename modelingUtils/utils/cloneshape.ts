import { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
const cloneShape = (oc: OpenCascadeInstance, shape: TopoDS_Shape) =>
	new oc.BRepBuilderAPI_Copy_2(shape, true, true).Shape();

export default cloneShape;
