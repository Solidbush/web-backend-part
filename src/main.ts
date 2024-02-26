import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";


async function start() {
  const PORT = process.env.PORT || 3080;
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: '*'})
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start()