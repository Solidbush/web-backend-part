import * as process from "process";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";


async function start() {
  const PORT = process.env.PORT || 3080;
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: '*'})
  const config = new DocumentBuilder()
      .setTitle('Online courses platform')
      .setDescription('Документация сервиса')
      .addTag('Solidbush')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start()