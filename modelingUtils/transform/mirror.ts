import type { TopoDS_Shape } from 'opencascade.js';
import { ax1, ax2, pnt } from '@modeling/oc_core';
import oc from '@modeling/oc';
const mirror = (
  shape: TopoDS_Shape,
  opts: {
    point?: [number, number, number];
    axis?: { origin?: [number, number, number]; direction?: [number, number, number] };
    plane?: [number, number, number];
  }
) => {
  const transform = new oc.gp_Trsf_1();
  const { point, axis, plane } = opts;
  if (plane) {
    transform.SetMirror_3(
      ax2({
        origin: [plane[0], plane[1], plane[2]],
        direction: [-plane[0], -plane[1], -plane[2]]
      })
    );
  } else if (axis) {
    const { origin, direction } = axis;
    transform.SetMirror_2(ax1({ origin, direction }));
  } else if (point) {
    transform.SetMirror_1(pnt({ pnt: point }));
  } else {
    console.warn('No Mirror set');
    return shape;
  }
  const transformer = new oc.BRepBuilderAPI_Transform_1(transform);
  transformer.Perform(shape, false);
  return transformer.Shape();
};

export default mirror;
