import partition from 'lodash/partition';
import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import xCafDocMaterialHandle from './XCafDocMaterialHandle';

// Takes a TDocStd_Document, creates a GLB file from it and returns a ObjectURL
export const solidsToGLB = (
	oc: OpenCascadeInstance,
	shapes: TopoDS_Shape | TopoDS_Shape[],
	options?: { fileName?: string }
) => {
	const file = `./${options?.fileName ?? 'file'}.glb`;
	let _shapes = Array.isArray(shapes) ? shapes : [shapes];
	let wires = [];
	const doc = new oc.TDocStd_Document(new oc.TCollection_ExtendedString_1());
	const shapeTool = oc.XCAFDoc_DocumentTool.ShapeTool(doc.Main()).get();
	// const colorTool = oc.XCAFDoc_DocumentTool.ColorTool(doc.Main()).get();
	const matTool = oc.XCAFDoc_DocumentTool.VisMaterialTool(doc.Main()).get();
	const mat_handle = xCafDocMaterialHandle(oc, {
		color: [1, 0.2431, 0],
		metallic: 0.75,
		roughness: 0.8
	});
	//const mat_handle = new oc.Handle_XCAFDoc_VisMaterial_2(mat);
	const mat_label = matTool.AddMaterial_1(
		mat_handle,
		new oc.TCollection_AsciiString_2('Default Material')
	);
	[_shapes, wires] = partition(_shapes, (s) => {
		switch (s.ShapeType()) {
			case oc.TopAbs_ShapeEnum.TopAbs_VERTEX:
				return false;
			case oc.TopAbs_ShapeEnum.TopAbs_EDGE:
				return false;
			case oc.TopAbs_ShapeEnum.TopAbs_WIRE:
				return false;
			default:
				return true;
		}
	});
	for (const s of _shapes) {
		shapeTool.SetShape(shapeTool.NewShape(), s);
		matTool.SetShapeMaterial_2(s, mat_label);
		// Tell OpenCascade that we want our shape to get meshed
		new oc.BRepMesh_IncrementalMesh_2(s, 0.1, false, 0.1, false);
		//colorTool.SetColor_6(s, new oc.Quantity_ColorRGBA_5(1, 0, 0, 1), oc.XCAFDoc_ColorType);
	}
	// Export a GLB file (this will also perform the meshing)
	const cafWriter = new oc.RWGltf_CafWriter(new oc.TCollection_AsciiString_2(file), true);
	cafWriter.Perform_2(
		new oc.Handle_TDocStd_Document_2(doc),
		new oc.TColStd_IndexedDataMapOfStringString_1(),
		new oc.Message_ProgressRange_1()
	);

	// Read the GLB file from the virtual file system
	const glbFile = oc.FS.readFile(file, { encoding: 'binary' });
	return { buffer: glbFile.buffer, wires };
};
