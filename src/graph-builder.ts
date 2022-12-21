import { GraphObject } from "./graph.interface";
import { mapSafeGetter } from "./utils/map";

export class GraphBuilder {
  private readonly document: GraphObject;
  constructor() {
    this.document = this.baseGraph();
  }

  baseGraph(): GraphObject {
    return {
      edge: new Map(),
    };
  }

  initEdge(module: string) {
    this.document.edge.set(module, []);
  }
  addEdge(from: string, to: string) {
    this.document.edge = this.document.edge.set(
      from,
      mapSafeGetter(this.document.edge, from).concat([to])
    );
    return this;
  }

  build(): GraphObject {
    return this.document;
  }
}
