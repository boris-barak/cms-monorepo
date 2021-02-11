import axios from 'axios';
import { PageOverview } from 'common/types/page';

const contentServiceApi = axios.create({ baseURL: 'http://localhost:3001' });

export const getPagesOverview = (): Promise<ReadonlyArray<PageOverview>> =>
    contentServiceApi.get('pages').then((response) => response.data);
