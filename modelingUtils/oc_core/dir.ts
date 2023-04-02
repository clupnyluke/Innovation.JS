import merge from 'lodash/merge';
import type { OpenCascadeInstance } from 'opencascade.js';

const dir = (oc: OpenCascadeInstance, opts?: { direction?: [number, number, number] }) => {
  const _opts = merge({ direction: [0, 0, 1] }, opts);
  const { direction } = _opts;
  const [x, y, z] = direction;
  return new oc.gp_Dir_4(x, y, z);
};

export default dir;
