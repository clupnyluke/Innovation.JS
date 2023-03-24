import oc from '@modeling/oc';
import { pnt, dir } from '@modeling/oc_core';

const ax2 = (
  opts?: { direction?: [number, number, number]; origin?: [number, number, number] }
) => {
  const _opts = { ...opts };
  const { origin, direction } = _opts;
  return new oc.gp_Ax2_3(pnt({ pnt: origin }), dir(oc, { direction }));
};

export default ax2;
