// import { cadespPage, arpenpPage, sielPage, sivecPage, cagedPage } from './providers/barrel';
import puppetteer = require('puppeteer');
import { SivecProvider, SielProvider,  } from './providers';

(async () => {

  const browser = await puppetteer
    .launch({
      headless: false,
      args: ['--full-screen']
    });

  const page = await browser.newPage();
  const siel = new SielProvider(page);

  siel.sielPage();

})();
