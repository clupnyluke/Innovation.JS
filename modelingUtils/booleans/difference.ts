import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import boolean from './boolean';

const difference = (oc: OpenCascadeInstance, ...shapes: TopoDS_Shape[]) =>
	boolean(oc, 'difference', ...shapes);

export default difference;
