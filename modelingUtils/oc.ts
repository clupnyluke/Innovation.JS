import { OpenCascadeInstance } from "opencascade.js";

// eslint-disable-next-line no-var
export var oc: OpenCascadeInstance

export const initOpenCascade = (_oc: OpenCascadeInstance) => oc = _oc;

export default oc