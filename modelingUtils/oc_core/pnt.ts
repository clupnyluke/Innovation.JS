import oc from '@modeling/oc';
import merge from 'lodash/merge';

const pnt = (opts?: { pnt?: [number, number, number] }) => {
  const _opts = merge({ pnt: [0, 0, 0] }, opts);
  const { pnt } = _opts;
  const [x, y, z] = pnt;
  return new oc.gp_Pnt_3(x, y, z);
};

export default pnt;
