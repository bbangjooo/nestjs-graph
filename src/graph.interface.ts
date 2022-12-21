export interface Graph {
  name: string;
  imports: string[];
  providers: string[];
  controllers: string[];
  exports: string[];
}

export interface GraphObject {
  edge: Map<string, string[]>;
}
