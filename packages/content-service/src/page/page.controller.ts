import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
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

    @Post('detail')
    createPage(@Body() page: PageDetail) {
        return this.pageService.createPage(page);
    }

    @Put('detail')
    updatePage(@Body() page: PageDetail) {
        return this.pageService.updatePage(page);
    }

    @Delete('detail/:url')
    removePage(@Param('url') url: string) {
        return this.pageService.removePage(url);
    }
}
