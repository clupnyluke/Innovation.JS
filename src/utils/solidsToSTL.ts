import { partition } from 'lodash';
import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import xCafDocMaterialHandle from './XCafDocMaterialHandle';

export const solidsToSTL = async (
	ocjs: Promise<OpenCascadeInstance>,
	solids: Promise<TopoDS_Shape | TopoDS_Shape[]>,
	options?: { fileName?: string }
) => {
	const file = `${options?.fileName ?? 'file'}.stl`;
	const oc = await ocjs;
	const _shapes = await solids;
	let shapes = Array.isArray(_shapes) ? _shapes : [_shapes];

	//const mat_handle = new oc.Handle_XCAFDoc_VisMaterial_2(mat);
	[shapes] = partition(shapes, (s) => {
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
	for (const s of shapes) {
		writer.Write(s, file, new oc.Message_ProgressRange_1());
	}
	const stlFile = oc.FS.readFile(file);
	const url = URL.createObjectURL(new Blob([stlFile.buffer], { type: 'model/stl-binary' }));

	return { url };
};
