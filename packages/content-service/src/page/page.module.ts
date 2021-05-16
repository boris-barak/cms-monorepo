import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PageController } from './page.controller';
import { PageService } from './page.service';
import { Page, PageSchema } from '../schemas/page.schema';
import { pagesData } from './pagesData.json';

@Module({
    imports: [MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }])],
    controllers: [PageController],
    providers: [PageService],
})
export class PageModule implements OnApplicationBootstrap {
    constructor(private pageService: PageService) {}

    async onApplicationBootstrap() {
        await this.pageService.seed(pagesData);
    }
}
