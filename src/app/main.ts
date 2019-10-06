// import { cadespPage, arpenpPage, sielPage, sivecPage, cagedPage } from './providers/barrel';
import puppetteer = require('puppeteer');
import { SivecProvider, SielProvider, CagedProvider, CadespProvider } from './providers';

(async () => {

  const browser = await puppetteer
    .launch({
      headless: false,
      args: ['--full-screen']
    });

  const page = await browser.newPage();
  const cadesp = new CadespProvider(page);
  cadesp.cadespPage();
})();
