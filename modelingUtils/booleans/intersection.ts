import type { TopoDS_Shape } from 'opencascade.js';
import boolean from './boolean';

const intersection = (...shapes: TopoDS_Shape[]) =>
  boolean('intersection', ...shapes);

export default intersection;
