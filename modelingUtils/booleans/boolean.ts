import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';

const boolean = (
	oc: OpenCascadeInstance,
	operation: 'union' | 'intersection' | 'difference',
	...shapes: TopoDS_Shape[]
) => {
	if (shapes.length < 2) return shapes;
	let opConstant;
	switch (operation) {
		case 'intersection':
			opConstant = oc.BOPAlgo_Operation.BOPAlgo_COMMON;
			break;
		case 'difference':
			opConstant = oc.BOPAlgo_Operation.BOPAlgo_CUT;
			break;
		case 'union':
			opConstant = oc.BOPAlgo_Operation.BOPAlgo_FUSE;
			break;
		default:
			opConstant = oc.BOPAlgo_Operation.BOPAlgo_UNKNOWN;
			break;
	}
	const args = new oc.TopTools_ListOfShape_1();
	args.Append_1(shapes.shift() as TopoDS_Shape);
	const tools = new oc.TopTools_ListOfShape_1();
	shapes.forEach((shape) => tools.Append_1(shape));
	const op = new oc.BRepAlgoAPI_BooleanOperation_1();
	op.SetOperation(opConstant);
	op.SetArguments(args);
	op.SetTools(tools);
	op.Build(new oc.Message_ProgressRange_1());

	const shape = op.Shape();
	return shape;
};

export default boolean;
