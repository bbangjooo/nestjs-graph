<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Description

module for drawing depednecy graph of [Nestjs](https://nestjs.com/) modules and serving it using static contents.

## Installation

```bash
$ npm i --save-dev nestjs-graph
```

## Quick Start

main.ts:

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { GraphModule } from "nestjs-graph";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  new GraphModule(app).serve("/graph", app.getHttpAdapter());
  await app.listen(3000);
}
bootstrap();
```

this code will draw dependency graph using [mermaid-js](https://mermaid.js.org/) on `/graph`. You can chnage it depending on your situation.

![alt](https://user-images.githubusercontent.com/51329156/208886831-721b3f50-166d-4034-b67a-cee11feefb09.png)

This is the dependency graph of [nestjs cat sample](https://github.com/nestjs/nest/tree/master/sample/01-cats-app)

## Future work

- add functionality to customize html contents.
- add interactive and detailed contents in graph
