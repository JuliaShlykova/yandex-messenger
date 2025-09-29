import { HOST } from '../modules/network/Constants';

const resourceUrl = (url: string) => HOST + '/resources' + url;

export default resourceUrl;
