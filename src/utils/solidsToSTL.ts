import partition from 'lodash/partition';
import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';

export const solidsToSTL = (
	oc: OpenCascadeInstance,
	shapes: TopoDS_Shape | TopoDS_Shape[],
	options?: { fileName?: string }
) => {
	const file = `${options?.fileName ?? 'file'}.stl`;
	let _shapes = Array.isArray(shapes) ? shapes : [shapes];

	//const mat_handle = new oc.Handle_XCAFDoc_VisMaterial_2(mat);
	[_shapes] = partition(_shapes, (s) => {
		switch (s.ShapeType()) {
			case oc.TopAbs_ShapeEnum.TopAbs_SOLID:
				return true;
			case oc.TopAbs_ShapeEnum.TopAbs_COMPOUND:
				return true;
			case oc.TopAbs_ShapeEnum.TopAbs_COMPSOLID:
				return true;
			case oc.TopAbs_ShapeEnum.TopAbs_SHELL:
				return true;
			default:
				return false;
		}
	});
	const mergeTool = new oc.Poly_MergeNodesTool(0, 0, -1);

	const writer = new oc.StlAPI_Writer();
	for (const s of _shapes) {
		writer.Write(s, file, new oc.Message_ProgressRange_1());
	}

	return oc.FS.readFile(file).buffer;
};
