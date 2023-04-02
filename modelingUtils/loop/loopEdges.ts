import { castShape } from "@modeling/utils";
import type { OpenCascadeInstance, TopoDS_Edge, TopoDS_Shape } from "opencascade.js";

const loopEdges = (oc: OpenCascadeInstance, shape: TopoDS_Shape, fn: (s: TopoDS_Edge) => void) => {
  const explorer = new oc.TopExp_Explorer_2(shape, oc.TopAbs_ShapeEnum.TopAbs_EDGE, oc.TopAbs_ShapeEnum.TopAbs_COMPSOLID)
  for (explorer; explorer.More(); explorer.Next()) {
    fn(castShape(oc, explorer.Current()))
  }
}

export default loopEdges;