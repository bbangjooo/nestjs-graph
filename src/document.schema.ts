import { GraphObject } from './graph.interface';

export const baseDocument = (root: string): GraphObject => ({
  edge: new Map([[root, []]]),
});
