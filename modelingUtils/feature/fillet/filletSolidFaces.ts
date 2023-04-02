import { loopEdges, loopFaces } from "@modeling/loop";
import { OpenCascadeInstance, TopoDS_Face, TopoDS_Shape } from "opencascade.js";

const filletSolidFaces = (oc: OpenCascadeInstance, solid: TopoDS_Shape, radius: number, fn: (face: TopoDS_Face) => boolean) => {
  const filletApi = new oc.BRepFilletAPI_MakeFillet(solid, oc.ChFi3d_FilletShape.ChFi3d_Rational)
  let hasFillet = false
  loopFaces(oc, solid, (_face) => {
    const shouldFillet = fn(_face)
    if (shouldFillet) {
      hasFillet = true
      loopEdges(oc, _face, (edge) => {
        filletApi.Add_2(radius, edge)
      })
    }
  })
  return hasFillet ? filletApi.Shape() : solid
}

export default filletSolidFaces