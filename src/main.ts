import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './common/config/env.config';


async function bootstrap() {
  //const env = envConfig();
  const app = await NestFactory.create(AppModule) //{
  //   logger:
  //     env.mode === 'development'
  //       ? ['log', 'debug', 'error', 'verbose', 'warn']
  //       : ['error', 'warn'],
  // });
  await app.listen(3000);
}
bootstrap();
