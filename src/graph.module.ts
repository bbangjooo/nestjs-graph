import { HttpServer, INestApplication } from "@nestjs/common";
import { NestContainer } from "@nestjs/core";
import { Module as TModule } from "@nestjs/core/injector/module";
import {
  EDGE_TEMPLATE,
  HTML_TEMPLATE,
  STYLE_TEMPLATE,
} from "./utils/constants";
import { GraphObject } from "./graph.interface";
import { GraphBuilder } from "./graph-builder";

export class GraphModule {
  private readonly modules: TModule[];
  public container: NestContainer;
  public graphBuilder: GraphBuilder;

  constructor(private readonly app: INestApplication) {
    this.container = (this.app as any).container as NestContainer;
    this.modules = Array.from(
      (this.container as NestContainer).getModules().values()
    ).filter((module) => module.metatype.name != "InternalCoreModule");
    this.graphBuilder = new GraphBuilder();
    this.buildGraph();
  }

  buildHtml(htmlTemplate: string = HTML_TEMPLATE, style?: string) {
    const document: GraphObject = this.graphBuilder.build();
    let templateString = "";
    for (const [from, to] of document.edge) {
      if (to.length === 0) {
        templateString = `${templateString}\n${from}`;
        continue;
      }
      to.forEach((t) => {
        templateString = `${templateString}\n${from}-->${t}`;
      });
    }

    if (style) {
      htmlTemplate = htmlTemplate.replace(STYLE_TEMPLATE, style);
    } else {
      htmlTemplate = htmlTemplate.replace(
        STYLE_TEMPLATE,
        ".mermaid {  display: flex; align-items: center; flex-direction: column  }"
      );
    }

    return htmlTemplate.replace(EDGE_TEMPLATE, templateString);
  }

  serve(
    path: string,
    httpAdapter: HttpServer,
    htmlTemplate: string = HTML_TEMPLATE
  ) {
    httpAdapter.get(path, (req, res) => {
      res.type("text/html");
      res.send(this.buildHtml(htmlTemplate));
    });
  }

  buildGraph() {
    this.modules.forEach((module) => {
      this.graphBuilder.initEdge(module.metatype.name);
      module.imports.forEach((child) => {
        if (child.distance == module.distance + 1) {
          this.graphBuilder.addEdge(module.metatype.name, child.metatype.name);
        }
      });
    });
  }
}
