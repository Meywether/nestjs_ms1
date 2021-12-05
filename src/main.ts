import { NestFactory } from '@nestjs/core';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

const errorLogPath = __dirname + '/../logs/application-%DATE%.error.log';
const infoLogPath = __dirname + '/../logs/application-%DATE%.info.log';
const debugLogPath = __dirname + '/../logs/application-%DATE%.debug.log';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new winston.transports.DailyRotateFile({
          format: winston.format.json(),
          datePattern: 'YYYY-MM-DD-HH',
          filename: errorLogPath,
          level: 'error',
          zippedArchive: true,
          maxFiles: '365d',
        }),
        new winston.transports.DailyRotateFile({
          format: winston.format.json(),
          datePattern: 'YYYY-MM-DD-HH',
          filename: infoLogPath,
          level: 'info',
          zippedArchive: true,
          maxFiles: '365d',
        }),
        new winston.transports.DailyRotateFile({
          format: winston.format.json(),
          datePattern: 'YYYY-MM-DD-HH',
          filename: debugLogPath,
          level: 'debug',
          zippedArchive: true,
          maxFiles: '365d',
        }),
        // other transports...
      ],
    }),
  });
  const configService = app.get(ConfigService);
  const REDIS_HOST = configService.get<string>('redis_host');
  const REDIS_PORT = configService.get<number>('redis_port');
  const REDIS_PW = configService.get<string>('redis_password');
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.REDIS,
    options: {
      host: REDIS_HOST,
      port: REDIS_PORT,
      auth_pass: REDIS_PW,
    },
  };
  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices()
  console.log('MS 1 is listening ....');
}
bootstrap();
