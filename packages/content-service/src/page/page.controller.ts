import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageService } from './page.service';
import { PageDetail, PageOverview } from 'cms-common/types/page';

@ApiTags('Pages')
@Controller('pages')
export class PageController {
    constructor(private readonly appService: PageService) {}

    @Get()
    async getPagesOverview(): Promise<ReadonlyArray<PageOverview>> {
        return this.appService.getOverviewList();
    }

    @Get('bulk')
    async getPagesBulk(): Promise<ReadonlyArray<PageDetail>> {
        return this.appService.getOverviewBulk();
    }

    @Get('detail/:url?')
    async getOnePage(@Param('url') url = ''): Promise<PageDetail> {
        const page = await this.appService.getOnePage(url);

        if (!page) {
            throw new NotFoundException();
        }

        return page;
    }
}
