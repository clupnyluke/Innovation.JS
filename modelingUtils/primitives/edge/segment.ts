import { pnt } from "@modeling/oc_core"
import type { OpenCascadeInstance } from 'opencascade.js';

const segment = (oc: OpenCascadeInstance, p1: [number, number, number], p2: [number, number, number]) => {
  let match = true
  for (let i = 0; i < 3 && match; i++) {
    if (p1[i] !== p2[i]) match = false
  }
  if (match) { throw new Error("P1 and P2 can't match") }
  return new oc.BRepBuilderAPI_MakeEdge_3(pnt(oc, { pnt: p1 }), pnt(oc, { pnt: p2 })).Edge()
}

export default segment