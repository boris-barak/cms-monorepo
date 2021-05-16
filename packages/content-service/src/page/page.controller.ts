import { Body, Controller, Get, NotFoundException, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageService } from './page.service';
import { PageDetail, PageOverview } from 'cms-common/types/page';

@ApiTags('Pages')
@Controller('pages')
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Get()
    async getPagesOverview(): Promise<ReadonlyArray<PageOverview>> {
        return this.pageService.getOverviewList();
    }

    @Get('bulk')
    async getPagesBulk(): Promise<ReadonlyArray<PageDetail>> {
        return this.pageService.getOverviewBulk();
    }

    @Get('detail/:url?')
    async getOnePage(@Param('url') url = ''): Promise<PageDetail> {
        const page = await this.pageService.getOnePage(url);

        if (!page) {
            throw new NotFoundException();
        }

        return page;
    }

    @Put('detail')
    updatePage(@Body() page: PageDetail) {
        return this.pageService.updatePage(page);
    }
}
