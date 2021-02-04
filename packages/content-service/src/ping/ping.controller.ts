import { Controller, Get } from '@nestjs/common';

@Controller()
export class PingController {
    @Get()
    get() {
        return { healthy: true };
    }
}
