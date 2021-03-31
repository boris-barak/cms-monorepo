import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PageService } from './page.service';
import { PageDetail, PageOverview } from 'cms-common/types/page';

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
