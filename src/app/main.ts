import puppetteer = require('puppeteer');
import {
  SivecProvider,
  SielProvider,
  CagedProvider,
  CadespProvider,
  ArpenpProvider,
  ArispProvider
} from './providers';

(async () => {
  const browser = await puppetteer.launch({
    headless: false,
    args: ['--full-screen']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const arisp = new ArispProvider(page, browser);
  arisp.arispPage();
})();
