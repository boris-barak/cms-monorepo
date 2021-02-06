import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageDetail, PageOverview, PageService } from './page.service';

@ApiTags('Pages')
@Controller('pages')
export class PageController {
    constructor(private readonly appService: PageService) {}

    @Get()
    getPagesOverview(): ReadonlyArray<PageOverview> {
        return this.appService.getOverviewList();
    }

    @Get('bulk')
    getPagesBulk(): ReadonlyArray<PageDetail> {
        return this.appService.getOverviewBulk();
    }

    @Get('detail/:url?')
    getOnePage(@Param('url') url = ''): PageDetail {
        const page = this.appService.getOnePage(url);

        if (!page) {
            throw new NotFoundException();
        }

        return page;
    }
}
