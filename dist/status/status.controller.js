"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusController = void 0;
const microservices_1 = require("@nestjs/microservices");
const status_dto_class_1 = require("../dto/status.dto.class");
class StatusController {
    constructor(configService) {
        this.configService = configService;
    }
    async getMS1Status() {
        const dto = new status_dto_class_1.StatusDTO();
        dto.name = 'MS 1';
        dto.version = this.configService.get('microservice_version');
        return dto;
    }
}
__decorate([
    (0, microservices_1.MessagePattern)('getMS1Status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatusController.prototype, "getMS1Status", null);
exports.StatusController = StatusController;
//# sourceMappingURL=status.controller.js.map