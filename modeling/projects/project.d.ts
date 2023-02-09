import type { OpenCascadeInstance, TopoDS_Shape } from 'opencascade.js';

declare global {
	export type Project = (
		oc: Promise<OpenCascadeInstance>
	) => Promise<TopoDS_Shape | TopoDS_Shape[]>;
}
