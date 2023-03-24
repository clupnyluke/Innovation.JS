import oc from '@modeling/oc';
import { vec } from '../oc_core';
import type { TopoDS_Shape } from 'opencascade.js';

const translate = (
  shape: TopoDS_Shape,
  opts: {
    translation: [number, number, number];
  }
) => {
  const { translation } = opts;
  const transform = new oc.gp_Trsf_1();
  transform.SetTranslation_1(vec({ vec: translation }));
  const transformer = new oc.BRepBuilderAPI_Transform_1(transform);
  transformer.Perform(shape, false);
  return transformer.Shape();
};

export default translate;
