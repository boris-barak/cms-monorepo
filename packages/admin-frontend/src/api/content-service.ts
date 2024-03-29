import axios from 'axios';
import { PageDetail } from 'cms-common/types/page';
import { MutationResponse } from 'cms-common/types/response';

const contentServiceApi = axios.create({ baseURL: 'http://localhost:3001' });

export const getAllPages = (): Promise<ReadonlyArray<PageDetail>> =>
    contentServiceApi.get('pages/bulk').then((response) => response.data);

export const getOnePageByUrl = (url: string): Promise<PageDetail> =>
    contentServiceApi.get(`pages/detail/${url}`).then((response) => response.data);

export const createPage = (page: PageDetail): Promise<MutationResponse> =>
    contentServiceApi.post(`pages/detail`, page).then((response) => response.data);

export const updatePage = (page: PageDetail): Promise<MutationResponse> =>
    contentServiceApi.put(`pages/detail`, page).then((response) => response.data);

export const removePageByUrl = (url: string): Promise<MutationResponse> =>
    contentServiceApi.delete(`pages/detail/${url}`).then((response) => response.data);
