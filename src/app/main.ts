// import { cadespPage, arpenpPage, sielPage, sivecPage, cagedPage } from './providers/barrel';
import puppetteer = require('puppeteer');
import { SivecProvider } from './providers';

(async () => {

  const browser = await puppetteer
    .launch({
      headless: false,
      args: ['--full-screen']
    });

  const page = await browser.newPage();
  const sivec = new SivecProvider(page);

  await sivec.sivecPage();

})();
