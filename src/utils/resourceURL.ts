import { HOST } from '../modules/http/Constants';

const resourceUrl = (url: string) => HOST + '/resources' + url;

export default resourceUrl;
