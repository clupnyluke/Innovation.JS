import { box } from '@modeling/primitives/3D';
import {
	BRepClass_FaceExplorer,
	GeomAbs_JoinType,
	OpenCascadeInstance,
	TopoDS_Compound,
	TopoDS_Shape
} from 'opencascade.js';
import { circle, rectangle } from '@modeling/primitives/2D';
import { translate } from '@modeling/transform';
import { castShape } from '@modeling/utils';
import { filletSolidFaces } from '@modeling/feature';
import { getFacePlane } from '@modeling/measure';
import { difference } from '@modeling/booleans';

export const constants = {
	supportHeight: 36.5,
	wallHeight: 20,
	baseSize: [42.5, 23],
	angle: 15,
	rounding: 5,
	tolerance: 0
};

export const main = async (ocp: Promise<OpenCascadeInstance>, cnst = constants) => {
	const oc = await ocp;
	const solids = [];
	const { supportHeight, wallHeight, baseSize, angle, rounding } = cnst;
	let top = rectangle(oc, { size: baseSize as [number, number] });
	top = translate(oc, top, { translation: [0, 0, supportHeight + wallHeight] });
	const offset = (supportHeight + wallHeight) * Math.tan((angle * Math.PI) / 180);
	const bottom = rectangle(oc, {
		size: baseSize.map((val) => val + 2 * offset) as [number, number]
	});
	const topWire = oc.BRepTools.OuterWire(castShape(oc, top));
	const bottomWire = oc.BRepTools.OuterWire(castShape(oc, bottom));
	const sectionApi = new oc.BRepOffsetAPI_ThruSections(true, false, 1.0e-6);
	sectionApi.AddWire(topWire);
	sectionApi.AddWire(bottomWire);
	let solid = sectionApi.Shape();
	solid = filletSolidFaces(oc, solid, rounding, (fc) => {
		const plane = getFacePlane(oc, castShape(oc, fc), true);
		if (!plane) return false;
		if (plane[0] == 0 && plane[1] == 0 && plane[3] === 0) return true;
	});
	const hole = box(oc, { size: [...baseSize, wallHeight], origin: [0, 0, supportHeight] });
	let output = difference(oc, solid, hole);
	output = difference(
		oc,
		output,
		box(oc, { size: [100, 100, 50], origin: [0, 0, supportHeight + 15] })
	);
	solids.push(output);
	return solids;
};

export default main;
