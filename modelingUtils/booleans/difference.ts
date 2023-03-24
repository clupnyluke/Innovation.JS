import type { TopoDS_Shape } from 'opencascade.js';
import boolean from './boolean';

const difference = (...shapes: TopoDS_Shape[]) =>
  boolean('difference', ...shapes);

export default difference;
