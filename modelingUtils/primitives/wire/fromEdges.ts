import type { OpenCascadeInstance, TopoDS_Edge } from "opencascade.js"

const fromEdges = (oc: OpenCascadeInstance, ...edges: TopoDS_Edge[]) => {
  const [a, b, c, d] = edges
  switch (edges.length) {
    case 1:
      return new oc.BRepBuilderAPI_MakeWire_2(a).Wire()
    case 2:
      return new oc.BRepBuilderAPI_MakeWire_3(a, b).Wire()
    case 3:
      return new oc.BRepBuilderAPI_MakeWire_4(a, b, c).Wire()
    case 4:
      return new oc.BRepBuilderAPI_MakeWire_5(a, b, c, d).Wire()
    default:
      throw new Error("fromEdges(): Only supports 1 - 4 edges for a wire")
  }
}

export default fromEdges