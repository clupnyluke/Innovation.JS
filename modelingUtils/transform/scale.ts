import oc from '@modeling/oc';
import { merge } from 'lodash';
import type { TopoDS_Shape } from 'opencascade.js';

const scale = (
  shape: TopoDS_Shape,
  opts?: {
    scale?: number | [number, number, number];
    scaleDirection?: [number, number, number];
  }
) => {
  const _opts = merge({ scale: 1, scaleDirection: [0, 0, 0] }, opts);
  const { scale, scaleDirection } = _opts;
  const _scale = Array.isArray(scale) ? [...scale] : [scale, scale, scale];
  const len = Math.sqrt(scaleDirection.reduce((s, val) => s + val ** 2, 0));
  let a11 = _scale[0];
  let a22 = _scale[1];
  let a33 = _scale[2];
  if (len) {
    a11 *= scaleDirection[0] / len;
    a22 *= scaleDirection[1] / len;
    a33 *= scaleDirection[2] / len;
  }
  const transform = new oc.gp_Trsf_1();
  transform.SetValues(a11, 0, 0, 0, 0, a22, 0, 0, 0, 0, a33, 0);
  const transformer = new oc.BRepBuilderAPI_Transform_1(transform);
  transformer.Perform(shape, false);
  return transformer.Shape();
};

export default scale;
