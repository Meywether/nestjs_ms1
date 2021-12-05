"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const winston = require("winston");
require("winston-daily-rotate-file");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const microservices_1 = require("@nestjs/microservices");
const nest_winston_1 = require("nest-winston");
const errorLogPath = __dirname + '/../logs/application-%DATE%.error.log';
const infoLogPath = __dirname + '/../logs/application-%DATE%.info.log';
const debugLogPath = __dirname + '/../logs/application-%DATE%.debug.log';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.timestamp(), nest_winston_1.utilities.format.nestLike()),
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
            ],
        }),
    });
    const configService = app.get(config_1.ConfigService);
    const REDIS_HOST = configService.get('redis_host');
    const REDIS_PORT = configService.get('redis_port');
    const microserviceOptions = {
        transport: microservices_1.Transport.REDIS,
        options: {
            url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
        },
    };
    app.connectMicroservice(microserviceOptions);
    app.startAllMicroservices(() => {
        console.log('MS 1 is listening ....');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map