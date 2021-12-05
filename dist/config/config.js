"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const config = () => ({
    server_mode: process.env.mode,
    microservice_version: process.env.npm_package_version,
    redis_host: process.env.REDIS_HOST,
    redis_port: process.env.REDIS_PORT,
    redis_url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
exports.config = config;
//# sourceMappingURL=config.js.map