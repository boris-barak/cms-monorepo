import axios from 'axios';
import { PageDetail } from 'cms-common/types/page';

const contentServiceApi = axios.create({ baseURL: 'http://localhost:3001' });

export const getAllPages = (): Promise<ReadonlyArray<PageDetail>> =>
    contentServiceApi.get('pages/bulk').then((response) => response.data);
