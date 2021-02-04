import { Module } from '@nestjs/common';

import { PingController } from './ping/ping.controller';
import { PageModule } from './page/page.module';

@Module({
    imports: [PageModule],
    controllers: [PingController],
    providers: [],
})
export class AppModule {}
