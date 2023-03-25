import merge from 'lodash/merge';
import { ax2 } from '@modeling/oc_core';
import type { OpenCascadeInstance } from 'opencascade.js';

type OptionalVec = [number, number, number] | [number, number] | [number] | number;

const box = (
  oc: OpenCascadeInstance,
  opts?: {
    size?: OptionalVec;
    origin?: [number, number, number];
    zDirection?: [number, number, number];
  }
) => {
  const _opts = merge({ size: [1, 1, 1], origin: [0, 0, 0] }, opts);
  const { zDirection, origin, size } = _opts;
  const [x, y, z] = Array.isArray(size) ? [...size, 1, 1] : [size, size, size];
  const newOrigin: [number, number, number] = [origin[0] - x / 2, origin[1] - y / 2, origin[2]];
  return new oc.BRepPrimAPI_MakeBox_5(

    ax2(oc, { origin: newOrigin, direction: zDirection }),
    x,
    y,
    z
  ).Shape();
};

export default box;