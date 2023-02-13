import merge from 'lodash/merge';
import type { OpenCascadeInstance } from 'opencascade.js';

const xCafDocMaterialHandle = (
	oc: OpenCascadeInstance,
	opts?: {
		color: [number, number, number, number] | [number, number, number];
		metallic?: number;
		roughness?: number;
	}
) => {
	const _opts = merge({ color: [1, 1, 1, 1], metallic: 0, roughness: 1 }, opts);
	const { color, metallic, roughness } = _opts;
	const [r, g, b, a] = color;
	const mat = new oc.XCAFDoc_VisMaterial();
	const mat_pbr = new oc.XCAFDoc_VisMaterialPBR();
	mat_pbr.BaseColor = new oc.Quantity_ColorRGBA_5(r, g, b, a ?? 1);
	mat_pbr.Metallic = metallic;
	mat_pbr.Roughness = roughness;
	mat.SetPbrMaterial(mat_pbr);
	return new oc.Handle_XCAFDoc_VisMaterial_2(mat);
};

export default xCafDocMaterialHandle;
