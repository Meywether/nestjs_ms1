import { ConfigService } from '@nestjs/config';
import { StatusDTO } from '../dto/status.dto.class';
export declare class StatusController {
    private readonly configService;
    constructor(configService: ConfigService);
    getMS1Status(): Promise<StatusDTO>;
}
