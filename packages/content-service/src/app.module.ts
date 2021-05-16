import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PingController } from './ping/ping.controller';
import { PageModule } from './page/page.module';

@Module({
    imports: [PageModule, MongooseModule.forRoot('mongodb://localhost/cms-content', { useCreateIndex: true })],
    controllers: [PingController],
    providers: [],
})
export class AppModule {}
