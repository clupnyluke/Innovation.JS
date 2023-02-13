import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import boolean from './boolean';

const union = (oc: OpenCascadeInstance, ...shapes: TopoDS_Shape[]) =>
	boolean(oc, 'union', ...shapes);

export default union;
