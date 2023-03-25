import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';
import boolean from './boolean';

const intersection = (oc: OpenCascadeInstance, ...shapes: TopoDS_Shape[]) =>
	boolean(oc, 'intersection', ...shapes);

export default intersection;
