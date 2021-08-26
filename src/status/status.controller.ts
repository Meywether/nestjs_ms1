import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { StatusDTO } from '../dto/status.dto.class';

export class StatusController {
  constructor(private readonly configService: ConfigService) {}

  @MessagePattern('getMS1Status')
  async getMS1Status(): Promise<StatusDTO> {
    const dto = new StatusDTO();
    dto.name = 'MS 1';
    // config not working, related to: https://github.com/nestjs/nest/issues/2343
    dto.version = this.configService.get('microservice_version'); // not working
    // dto.version = process.env.npm_package_version; // works
    return dto;
  }
}
