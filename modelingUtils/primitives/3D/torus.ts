import merge from 'lodash/merge';
import { TAU } from '@modeling/constants';
import { ax2 } from '@modeling/oc_core';
import type { OpenCascadeInstance } from 'opencascade.js';

const torus = (
  oc: OpenCascadeInstance,
  opts?: {
    origin?: [number, number, number];
    zDirection?: [number, number, number];
    innerRadius?: number;
    outerRadius?: number;
    topAngle?: number;
    bottomAngle?: number;
    angle?: number;
  }
) => {
  const _opts = merge(
    {
      origin: [0, 0, 0],
      innerRadius: 2,
      outerRadius: 3,
      angle: TAU
    },
    opts
  );
  const { origin, zDirection, innerRadius, outerRadius, angle } = _opts;
  origin[2] = origin[2] + innerRadius;
  const axes = ax2(oc, { origin, direction: zDirection });
  return new oc.BRepPrimAPI_MakeTorus_6(axes, outerRadius, innerRadius, angle).Shape();
};

export default torus;
