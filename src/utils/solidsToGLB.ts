import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import xCafDocMaterialHandle from './XCafDocMaterialHandle';

// Takes a TDocStd_Document, creates a GLB file from it and returns a ObjectURL
export const solidsToGLB = async (
	ocjs: Promise<OpenCascadeInstance>,
	solids: Promise<TopoDS_Shape | TopoDS_Shape[]>,
	options?: { fileName?: string }
) => {
	const file = `./${options?.fileName ?? 'file'}.glb`;
	const oc = await ocjs;
	const _shapes = await solids;
	const shapes = Array.isArray(_shapes) ? _shapes : [_shapes];
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
	for (const s of shapes) {
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
	const url = URL.createObjectURL(new Blob([glbFile.buffer], { type: 'model/gltf-binary' }));
	return url;
};
