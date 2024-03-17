import { dir, pnt } from '@modeling/oc_core';
import { OpenCascadeInstance, TopoDS_Face } from 'opencascade.js';

const getPlaneOfFace = (oc: OpenCascadeInstance, face: TopoDS_Face, normalized = true) => {
	const surface = new oc.BRepAdaptor_Surface_2(face, true);
	if (surface.GetType() !== oc.GeomAbs_SurfaceType.GeomAbs_Plane) {
		console.error('Face is not a plane');
		return;
	}

	const planeNormal = dir(oc);
	const pointOnPlane = pnt(oc);
	const samplePoint = new oc.gp_Pnt2d_3(0, 0);
	const context = new oc.Handle_IntTools_Context_2(new oc.IntTools_Context_1());

	oc.BOPTools_AlgoTools3D.PointInFace_1(face, pointOnPlane, samplePoint, context);
	oc.BOPTools_AlgoTools3D.GetNormalToSurface(
		surface.Surface().Surface(),
		samplePoint.X(),
		samplePoint.Y(),
		planeNormal
	);

	let plane = [
		planeNormal.X(),
		planeNormal.Y(),
		planeNormal.Z(),
		pointOnPlane.XYZ().Dot(planeNormal.XYZ())
	];
	if (normalized) {
		if (plane[3] < 0) {
			plane = plane.map((val) => val * -1);
		}
		plane = plane.map((val) => (val === 0 ? 0 : val));
	}
	return plane;
};

export default getPlaneOfFace;
