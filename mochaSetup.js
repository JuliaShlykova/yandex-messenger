import {JSDOM} from 'jsdom';

const jsdom = new JSDOM('<body><div id="app"></div></body>', {
  url: 'http://localhost'
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest;
global.File = jsdom.window.File;
global.history = jsdom.window.history;
global.location = jsdom.window.location;
global.MouseEvent = jsdom.window.MouseEvent;
