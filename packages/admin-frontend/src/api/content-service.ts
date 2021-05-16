import axios from 'axios';
import { PageDetail } from 'cms-common/types/page';

const contentServiceApi = axios.create({ baseURL: 'http://localhost:3001' });

export const getAllPages = (): Promise<ReadonlyArray<PageDetail>> =>
    contentServiceApi.get('pages/bulk').then((response) => response.data);

export const getOnePageByUrl = (url: string): Promise<PageDetail> =>
    contentServiceApi.get(`pages/detail/${url}`).then((response) => response.data);

export const updatePage = (page: PageDetail): Promise<PageDetail> =>
    contentServiceApi.put(`pages/detail`, page).then((response) => response.data);
