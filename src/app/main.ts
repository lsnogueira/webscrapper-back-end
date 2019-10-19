import puppetteer = require('puppeteer');
import {
  SivecProvider,
  SielProvider,
  CagedProvider,
  CadespProvider,
  ArpenpProvider
} from './providers';

(async () => {
  const browser = await puppetteer.launch({
    headless: false,
    args: ['--full-screen']
  });

  const page = await browser.newPage();
  const caged = new CagedProvider(page);
  caged.cagedPage();
})();
