import puppetteer = require('puppeteer');
import {
  SivecProvider,
  SielProvider,
  CagedProvider,
  CadespProvider,
  ArpenpProvider,
  ArispProvider,
  InfocrimProvider,
  JucespProvider,
  DetranProvider,
  CensecProvider

} from './providers';

(async () => {
  const browser = await puppetteer.launch({
    headless: true,
    args: ['--full-screen', '--disable-notifications']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const aris = new ArispProvider(page, browser);
  aris.arispPage();
})();
