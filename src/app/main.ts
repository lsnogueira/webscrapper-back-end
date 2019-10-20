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
  DetranProvider
} from './providers';

(async () => {
  const browser = await puppetteer.launch({
    headless: false,
    args: ['--full-screen', '--disable-notifications']
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
  const detran = new DetranProvider(page);
  detran.detranPage();
})();
