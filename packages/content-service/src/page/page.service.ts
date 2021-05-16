import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageDetail, PageOverview } from 'cms-common/types/page';
import { Page } from '../schemas/page.schema';

@Injectable()
export class PageService {
    constructor(@InjectModel(Page.name) private pageModel: Model<PageDetail>) {}

    public async seed(items: ReadonlyArray<PageDetail>) {
        await this.pageModel.deleteMany({});

        // concat is there only for converting ReadonlyArray to Array type
        return this.pageModel.collection.insertMany(items.concat());
    }

    async getOverviewBulk(): Promise<ReadonlyArray<PageDetail>> {
        return this.pageModel.find().exec();
    }

    async getOverviewList(): Promise<ReadonlyArray<PageOverview>> {
        return this.pageModel.find({}, { title: 1, url: 1 }).exec();
    }

    async getOnePage(url = ''): Promise<PageDetail> {
        return this.pageModel.findOne({ url }).exec();
    }
}
