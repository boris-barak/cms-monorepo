import { Injectable } from '@nestjs/common';
import { pagesData } from './pagesData.json';

export type PageOverview = {
    title: string;
    url: string;
};

export type PageDetail = PageOverview & {
    keywords?: ReadonlyArray<string>;
    content: string;
};

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

    getOnePage(url: string = ''): PageDetail {
        console.log('url', url);

        return pagesData.find((page) => page.url === url);
    }
}
