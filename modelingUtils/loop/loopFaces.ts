
import { castShape } from "@modeling/utils";
import type { OpenCascadeInstance, TopoDS_Face, TopoDS_Shape } from "opencascade.js";

const loopFaces = (oc: OpenCascadeInstance, shape: TopoDS_Shape, fn: (s: TopoDS_Face) => void) => {
  const explorer = new oc.TopExp_Explorer_2(shape, oc.TopAbs_ShapeEnum.TopAbs_FACE, oc.TopAbs_ShapeEnum.TopAbs_COMPSOLID)
  for (explorer; explorer.More(); explorer.Next()) {
    fn(castShape(oc, explorer.Current()))
  }
}

export default loopFaces;