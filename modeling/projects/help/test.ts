import { initOpenCascade } from '@modeling/oc'
import { rectangle } from '@modeling/primitives/2D';
import { box } from '@modeling/primitives/3D';
import { OpenCascadeInstance } from 'opencascade.js';


export const constants = {};
export const main = async (ocp: Promise<OpenCascadeInstance>, cnst = constants) => {
  initOpenCascade(await ocp)
  return [];

};

export default main;
