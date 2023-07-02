import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  // Инициализация Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('PRO.FINANCE Authorization API')
    .setDescription('Authorization API for JWT generation and validation')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
