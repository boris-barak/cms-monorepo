import { Injectable } from '@nestjs/common';
import { pagesData } from './pagesData.json';
import { PageDetail, PageOverview } from 'common/types/page';

@Injectable()
export class PageService {
    getOverviewBulk(): ReadonlyArray<PageDetail> {
        return pagesData;
    }

    getOverviewList(): ReadonlyArray<PageOverview> {
        return pagesData.map((page) => ({
            title: page.title,
            url: page.url,
        }));
    }

    getOnePage(url = ''): PageDetail {
        console.log('url', url);

        return pagesData.find((page) => page.url === url);
    }
}
