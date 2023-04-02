
import { OpenCascadeInstance } from 'opencascade.js';
import { segment } from '../edge';

const fromPoints = (oc: OpenCascadeInstance, points: [number, number, number][], close = true) => {
  if (points.length < 2) throw new Error('must have at least 2 points')
  const segments = points.reduce((cur, val, i) => { return [...cur, segment(oc, val, points[(i + 1) % points.length])] }, [])
  const wire = new oc.BRepBuilderAPI_MakeWire_1();

  if (close) {
    if (points.length < 3) throw new Error('Must have at least 3 points to close')
  } else {
    segments.pop()
  }

  segments.forEach((s) => {
    wire.Add_1(s)
  })
  return wire.Wire()
}

export default fromPoints