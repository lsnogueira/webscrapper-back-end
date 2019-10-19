import { cadespPage, arpenpPage, sielPage, sivecPage, cagedPage } from './providers/barrel';
import puppetteer = require('puppeteer');


(async () => {

  const browser = await puppetteer
    .launch({
      headless: false,
      args: ['--full-screen']
    });

  const page = await browser.newPage();
  cagedPage(page);
  

})();
