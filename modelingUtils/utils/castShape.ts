import { OpenCascadeInstance, TopoDS_Edge, TopoDS_Face, TopoDS_Shape, TopoDS_Shell, TopoDS_Solid, TopoDS_Vertex, TopoDS_Wire } from "opencascade.js";

const castShape = <T extends TopoDS_Face | TopoDS_Edge | TopoDS_Solid | TopoDS_Shell | TopoDS_Vertex | TopoDS_Wire>(oc: OpenCascadeInstance, shape: TopoDS_Shape) => {
  switch (shape.ShapeType()) {
    case oc.TopAbs_ShapeEnum.TopAbs_VERTEX:
      return oc.TopoDS.Vertex_1(shape) as T
    case oc.TopAbs_ShapeEnum.TopAbs_EDGE:
      return oc.TopoDS.Edge_1(shape) as T
    case oc.TopAbs_ShapeEnum.TopAbs_WIRE:
      return oc.TopoDS.Wire_1(shape) as T
    case oc.TopAbs_ShapeEnum.TopAbs_FACE:
      return oc.TopoDS.Face_1(shape) as T
    case oc.TopAbs_ShapeEnum.TopAbs_SHELL:
      return oc.TopoDS.Shell_1(shape) as T
    case oc.TopAbs_ShapeEnum.TopAbs_SOLID:
      return oc.TopoDS.Solid_1(shape) as T
    default:
      throw new Error('Unrecognized shape for cast')
  }
}

export default castShape